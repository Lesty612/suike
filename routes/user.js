var express = require('express'),
	router = express.Router();

/**
 * [基于user的二级路由]
 */
router.get('/user', function(req, res) {
	res.send('get /user');
});