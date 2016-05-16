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

router.get('/user_select_info', function(req, res) {
	res.status(200).json({
		userName: 'Lesty',
		curBookId: 2,
		curUnitId: 1
	});
});

router.post('/books_info', function(req, res) {
	res.status(200).json([
		{
			name: '人教版第一册',
			bookId: 1,
			progress: '29'
		},
		{
			name: '人教版第二册',
			bookId: 2,
			progress: '12'
		},
		{
			name: '人教版第三册',
			bookId: 3,
			progress: '24'
		},
		{
			name: '人教版第四册',
			bookId: 4,
			progress: '26'
		}
	]);
});

router.post('/choose_book', function(req, res) {
	res.status(200).json({
		status: true,
		units: [
			{
				uid: 1,
				hasLearned: 5,
				total: 30
			},
			{
				uid: 2,
				hasLearned: 4,
				total: 32
			},
			{
				uid: 3,
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
			learnState: true,
			score: 0
		},
		{
			word: "good",
			learnState: true,
			score: 1
		},
		{
			word: "break",
			learnState: true,
			score: 0
		},
		{
			word: "controller",
			learnState: true,
			score: 2
		}
	]);
});

router.post('/change_learn_state', function(req, res) {
	res.status(200).json({
		status: true
	});
});

module.exports = router;