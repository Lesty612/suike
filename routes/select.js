var express = require('express'),
	router = express.Router();

/**
 * [学习单元选择模块的路由]
 * @author Lesty
 * @codeDate 2016.5.13
 */
router.get('/', function(req, res) {
	res.render('select');
});

router.post('/choose_book', function(req, res) {
	res.status(200).json({
		status: true,
		units: [
			{
				unit: 1,
				hasLearned: 5,
				total: 30
			},
			{
				unit: 2,
				hasLearned: 4,
				total: 32
			},
			{
				unit: 3,
				hasLearned: 17,
				total: 35
			}
		]
	});
});

router.get('/choose_unit', function(req, res) {
	res.status(200).json([
		{
			part: 1,
			hasLearned: 2,
			total: 15
		},
		{
			part: 2,
			hasLearned: 3,
			total: 15
		}
	]);
});

router.get('/choose_part', function(req, res) {
	res.status(200).json([
		{
			word: "hello",
			learnState: true
		},
		{
			word: "good",
			learnState: true
		},
		{
			word: "break",
			learnState: true
		},
		{
			word: "controller",
			learnState: true
		}
	]);
});

router.post('/change_learn_state', function(req, res) {
	res.status(200).json({
		status: true
	});
});

module.exports = router;