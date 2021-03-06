var mongodb = require('./db');

function User(user) {
	this.userName = user.userName;
	this.password = user.password;
	this.email = user.email;
	// 当前选择的教材
	this.curBookId = user.curBookId;
	// 当前选择的单元(对应教材)
	this.curUnitId = user.curUnitId;
};

// 存储用户信息
User.prototype.save = function(callback) {
	var user = {
		userName: this.userName,
		password: this.password,
		email: this.email,
		curBookId: this.curBookId,
		curUnitId: this.curUnitId
	};

	// 打开数据库
	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		// 读取集合(表)users
		db.collection('users', function(err, collection) {
			if(err) {
				mongodb.close();
				return callback(err);
			}

			// 插入数据
			collection.insert(user, {safe: true}, function(err) {
				mongodb.close();

				if(err) {
					return callback(err);
				}

				callback(null);
			});
		});
	});
};

// 读取用户信息
User.get = function(email, callback) {
	console.log('[User get 查询email]----', email);
	// 打开数据库
	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		// 读取集合
		db.collection('users', function(err, collection) {
			if(err) {
				mongodb.close();
				return callback(err);
			}

			// 根据email查找一个文档
			collection.findOne({
				email: email
			}, function(err, user) {
				mongodb.close();

				if(err) {
					return callback(err);
				}

				console.log('[User get 返回数据]----', user);
				user && (user._id = user._id.toHexString());
				callback(null, user);
			});
		});
	});
};

/**
 * [update 更新用户信息]
 * @param  {Object}   updateObj [需要更新的数据，其中id相关的类型都是ObjectId]
 */
User.update = function(email, updateObj, callback) {
	// 打开数据库
	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		// 读取集合
		db.collection('users', function(err, collection) {
			if(err) {
				mongodb.close();
				return callback(err);
			}

			// 根据email更新一个文档
			collection.updateOne({
				email: email
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

module.exports = User;