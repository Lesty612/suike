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

router.get('/get_words_detail', function(req, res) {
	res.status(200).json([
		{
			id: 1,
			word: "hello",
			learnState: true,
			score: 0,
			dt: 0
		},
		{
			id: 2,
			word: "good",
			learnState: true,
			score: 1,
			dt: 0
		},
		{
			id: 3,
			word: "break",
			learnState: false,
			score: 0,
			dt: 0
		},
		{
			id: 4,
			word: "controller",
			learnState: true,
			score: 2,
			dt: 0
		}
	]);
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