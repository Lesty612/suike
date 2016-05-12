var express = require('express'),
	router = express.Router();
/**
 * [主页面路由]
 * @codeDate 2016.5.10
 */
router.get('/', function(req, res, next) {
	res.render('main');
});

router.post('/login', function(req, res) {
	res.status(200).send(req.body);
});

router.post('/register', function(req, res) {
	res.status(200).send(req.body);
});

module.exports = router;