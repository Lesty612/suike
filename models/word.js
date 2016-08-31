var mongodb = require('./db'),
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
	this.score = word.score;
	this.learnState = word.learnState;
	this.dt = word.dt;
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
 * [getAllByUnitId 通过unitId获取所有单词详细信息]
 */
Word.getAllByUnitId = function(unitId, callback) {
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
				db.close();
				if(err) {
					return callback(err);
				}

				callback(null, words);
			});
		});
	});
};

/**
 * [getAllByUnitId 通过unitId获取所有单词简略信息]
 */
Word.getAllSimpleByUnitId = function(unitId, callback) {
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

			col.find({unitId: unitId}).project({
				word: 1,
				learnState: 1,
				dt: 1
			}).toArray(function(err, words) {
				db.close();
				if(err) {
					return callback(err);
				}

				callback(null, words);
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