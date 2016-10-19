var mongodb = require('./db'),
	tools = require('../routes/tools'),
	ObjectID = require('mongodb').ObjectID;

function Word(word) {
	this.word = word.word;
	this.wordAudio = word.wordAudio;
	this.wordMean = word.wordMean;
	this.sentence = word.sentence;
	this.sentenceAudio = word.sentenceAudio;
	this.sentenceMean = word.sentenceMean;
	this.p1 = word.p1;
	this.p2 = word.p2;
}

/**
 * [get 获取单词详细信息]
 */
Word.get = function(wordId, callback) {

};

/**
 * [getSimple 获取单词简略信息]
 * @param  {[type]}   wordId   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Word.getSimple = function(wordId, callback) {

};

/**
 * [getAll 通过unitId和userId获取所有单词详细信息]
 */
Word.getAll = function(userId, unitId, callback) {
	userId = ObjectID(userId);
	unitId = ObjectID(unitId);
	
	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		db.collection('words', function(err, col) {
			if(err) {
				db.close();
				return callback(err);
			}

			col.find({unitId: unitId}).toArray(function(err, words) {
				if(err) {
					db.close();
					return callback(err);
				}

				var len = words.length;
				db.collection('users_words', function(err, uwCol) {
					if(err) {
						db.close();
						return callback(err);
					}

					words.forEach(function(item, index, arr) {
						uwCol.findOne({
							wordId: item._id,
							userId: userId
						}, {
							_id: 0,
							score: 1,
							learnState: 1,
							dt: 1
						}, function(err, userWord) {
							if(err) {
								db.close();
								return callback(err);
							}

							if(userWord == null) { // 如果学习状态不存在，赋默认值
								userWord = {
									score: 0,
									learnState: true,
									dt: 0
								};
							} else { // 如果存在，则检测相应字段
								userWord.dt = userWord.dt != null ? userWord.dt : 0;
								userWord.score = userWord.score != null ? userWord.score : 0;
								userWord.learnState = userWord.learnState != null ? userWord.learnState : true;
							}

							tools.extend(arr[index], userWord);

							if(--len === 0) {
								db.close();
								return callback(arr);
							}
						});
					});
				});
			});
		});
	});
};


/**
 * [update 更新单词信息]
 * @param  {Object}   updateObj [需要更新的数据，其中id相关的类型都必须是ObjectId]
 */
Word.update = function(wordId, updateObj, callback) {
	wordId = ObjectID(wordId);
	// 打开数据库
	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		// 读取集合
		db.collection('words', function(err, collection) {
			if(err) {
				db.close();
				return callback(err);
			}

			// 根据wordId更新一个文档
			collection.updateOne({
				_id: wordId
			}, {$set: updateObj}, function(err) {
				db.close();

				if(err) {
					return callback(err);
				}

				callback(null);
			});
		});
	});
};

module.exports = Word;