var express = require('express'),
	router = express.Router();
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
		res.status(200).json({
			error: "用户名或密码错误！"
		});
	}
});

router.post('/register', function(req, res) {
	res.redirect('/select');
});

router.get('/logout', function(req, res) {
	res.redirect('/#/login');
});

module.exports = router;