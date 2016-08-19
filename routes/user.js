var express = require('express'),
	router = express.Router(),
	crypto = require('crypto'),
	User = require('../models/user'),
	tools = require('./tools');

/**
 * [主页面路由]
 * @codeDate 2016.5.10
 */
// 检测用户是否已登录过
// 已登录则直接跳转到选择页面
// 否则渲染主页
router.get('/', tools.checkLogin);
router.get('/', function(req, res, next) {
	res.render('user');
});

// 登录
router.post('/login', function(req, res) {
	// MD5加密密码
	var md5 = crypto.createHash('md5');

	var email = req.body.email,
		password = req.body.password;

	password = md5.update(password).digest('hex');

	User.get(email, function(err, user) {
		if(!user) {
			return res.status(200).json({
				msg: '用户不存在！'
			});
		}

		if(password !== user.password) {
			return res.status(200).json({
				msg: '密码错误！'
			});
		}

		// 用户信息存入session 
		req.session.user = user;

		if(user.curBookId) {
			// 进入单元页
			res.status(200).json({
				msg: '',
				url: '/select'
			});
		} else {
			// 进入教材页
			res.status(200).json({
				msg: '',
				url: '/select#/books'
			});
		}

	});
});

// 注册
router.post('/register', function(req, res) {
	var userName = req.body.userName,
		password = req.body.password,
		passwordAg = req.body.passwordAg;

	// 密码不一致
	if(password !== passwordAg) {
		return res.status(200).json({
			msg: '两次密码不一致！'
		});
	} else {
		// MD5加密密码
		var md5 = crypto.createHash('md5');

		password = md5.update(password).digest('hex');

		// 新用户
		var newUser = new User({
			userName: userName,
			password: password,
			email: req.body.email,
			curBookId: null,
			curUnitId: null
		});

		// 检查邮箱是否已被使用
		User.get(newUser.email, function(err, user) {
			if(err) {
				return res.status(200).json({
					msg: err
				});
			}

			// 用户名已存在
			if(user && user.userName === newUser.userName) {
				return res.status(200).json({
					msg: '用户名已存在！'
				});
			}

			// 邮箱已被使用
			if(user && user.email === newUser.email) {
				return res.status(200).json({
					msg: '邮箱已被使用！'
				});
			}

			newUser.save(function(err) {
				if(err) {
					return res.status(200).json({
						msg: err
					});
				}

				// 用户信息存入session
				
				req.session.user = newUser;

				// 进入学习页
				res.status(200).json({
					msg: '',
					url: '/select#/books'
				});
			});
		});
	}
});

// 注销
router.get('/logout', function(req, res) {
	// 消除用户session记录
	req.session.user = null;

	res.redirect('/#/login');
});

module.exports = router;