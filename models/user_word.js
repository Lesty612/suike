var mongodb = require('./db'),
	ObjectID = require('mongodb').ObjectID;

/**
 * [维护用户的单词学习信息]
 */

function UserWord(userWord) {
	this.userId = userWord.userId;
	this.wordId = userWord.wordId;
	this.score = userWord.score;
	this.learnState = userWord.learnState;
	this.dt = userWord.dt;
}

UserWord.getAll = function(userId, unitId, callback) {
	userId = ObjectID(userId);
	unitId = ObjectID(unitId);
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

			// 查找一个文档
			collection.find({
				unitId: unitId
			}).project({
				_id: 1,
				word: 1
			}).toArray(function(err, words) {
				if(err) {
					db.close();
					return callback(err);
				}

				var userWords = [];
				var len = words.length;

				db.collection('users_words', function(err, uwCol) {
					if(err) {
						db.close();
						return callback(err);
					}

					words.forEach(function(item, index) {
						uwCol.findOne({
							wordId: item._id,
							userId: userId
						}, function(err, userWord) {
							if(err) {
								db.close();
								return callback(err);
							}

							if(userWord == null) {
								userWord = {
									wordId: item._id,
									userId: userId,
									score: 0,
									learnState: true,
									dt: 0
								};
							}

							userWord.word = item.word;

							userWords.push(userWord);

							if(--len === 0) {
								db.close();
								return callback(userWords);
								console.log(userWords);
							}
						});
					});
				});
			});
		});
	});
};

/**
 * [update 更新用户单词状态信息]
 * @param  {Object}   updateObj [需要更新的数据，其中id相关的类型都必须是ObjectId]
 */
UserWord.update = function(userId, wordId, updateObj, callback) {
	userId = ObjectID(userId);
	wordId = ObjectID(wordId);
	// 打开数据库
	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		// 读取集合
		db.collection('users_words', function(err, collection) {
			if(err) {
				db.close();
				return callback(err);
			}

			// 更新一个文档
			collection.updateOne({
				wordId: wordId,
				userId: userId
			}, {$set: updateObj}, {upsert: true}, function(err) {
				db.close();

				if(err) {
					return callback(err);
				}

				callback(null);
			});
		});
	});
};

module.exports = UserWord;