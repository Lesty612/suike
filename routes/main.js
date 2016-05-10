var express = require('express'),
	router = express.Router();
/**
 * [主页面路由]
 * @codeDate 2016.5.10
 */
router.get('/', function(req, res, next) {
	res.render();
	res.render('main');
});

router.get('/login', function() {
	console.log(req.body);
	res.status(200).send(req.body);
});