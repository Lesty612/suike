var express = require('express'),
    router = express.Router();

/**
 * [基于user的二级路由]
 */
router.get('/info', function(req, res) {
    res.send('user info');
});

router.get('/books', function(req, res) {
	res.send('user books');
});

router.get('/units', function(req, res) {
	res.send('user units');
});

module.exports = router;