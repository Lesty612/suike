var express = require('express'),
    router = express.Router();

/**
 * [做题模块的路由]
 * @author Lesty
 * @codeDate 2016.5.13
 */
router.get('/', function(req, res) {
	res.render('type');
});

router.get('/update_done_date', function(req, res) {
    res.status(200).json({
    	status: true
    });
});

router.get('/books', function(req, res) {
	res.send('user books');
});

router.get('/units', function(req, res) {
	res.send('user units');
});

module.exports = router;