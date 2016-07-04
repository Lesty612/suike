var mongodb = require('./db');

function User(user) {
	this.userName = user.userName;
	this.password = user.password;
	this.email = user.email;
};

// 存储用户信息
User.prototype.save = function() {
	var user = {
		userName: this.userName,
		password: this.password,
		email: this.email
	};
};