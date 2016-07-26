var mongodb = require('./db');

function User(user) {
	this.userName = user.userName;
	this.password = user.password;
	this.email = user.email;
};

// 存储用户信息
User.prototype.save = function(callback) {
	var user = {
		userName: this.userName,
		password: this.password,
		email: this.email
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
User.get = function(userName, callback) {
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

			// 查找用户名为userName的一个文档
			collection.findOne({
				userName: userName
			}, function(err, result) {
				mongodb.close();

				if(err) {
					return callback(err);
				}

				callback(null, result);
			});
		});
	});
};

module.exports = User;