var express = require('express'),
	router = express.Router(),
	crypto = require('crypto'),
	User = require('../models/user');

/**
 * [主页面路由]
 * @codeDate 2016.5.10
 */
router.get('/', function(req, res, next) {
	res.render('user');
});

router.post('/login', function(req, res) {
	if(req.body.email === "lesty612@163.com" && req.body.password === "123456") {
		res.redirect('/select');
	} else {
		return res.status(200).json({
			error: "用户名或密码错误！"
		});
	}
});

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
		var md5 = crypto.createHash('md5'),
			password = md5.update(password).digest('hex');

		// 新用户
		var newUser = new User({
			userName: userName,
			password: password,
			email: req.body.email
		});

		// 检查用户名是否已存在
		User.get(newUser.userName, function(err, user) {
			if(err) {
				return res.status(200).json({
					msg: err
				});
			}
			// 用户已存在
			if(user) {
				return res.status(200).json({
					msg: '用户已存在！'
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
					url: '/select'
				});
			});
		});
	}
});

router.get('/logout', function(req, res) {
	res.redirect('/#/login');
});

module.exports = router;