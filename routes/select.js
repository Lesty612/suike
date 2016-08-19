var express = require('express'),
	router = express.Router(),
	Book = require('../models/book'),
	Unit = require('../models/unit'),
	tools = require('./tools');

/**
 * [学习单元选择模块的路由]
 * @author Lesty
 * @codeDate 2016.5.13
 */
// 检测用户是否已登录过
// 如果没有登录则直接跳转到登录页面
// 否则渲染选择页面
router.get('/', tools.checkNotLogin);
router.get('/', function(req, res) {
	res.render('select');
});

// 获取用户选择信息(教材、单元)
router.get('/user_select_info', function(req, res) {
	var user = req.session.user;

	res.status(200).json({
		userName: user.userName,
		curBookId: user.curBookId,
		curUnitId: user.curUnitId
	});
});

// 获取教材信息
router.get('/books_info', function(req, res) {
	Book.getAllByEditionId("57b167ea4407383982740297", function(err, books) {
		if(err) {
			res.status(200).json(err);
		}
		
		res.status(200).json(books);
	});
});

router.post('/choose_book', function(req, res) {
	Unit.getAllByBookId(req.body.bookId, function(err, units) {
		if(err) {
			res.status(200).json(err);
		}

		res.status(200).json(units);
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

[{
	part: 1,
	hasLearned: 2,
	total: 15
}]

router.get('/choose_part', function(req, res) {
	res.status(200).json([
		{
			id: 1,
			word: "hello",
			learnState: true,
			dt: 0
		},
		{
			id: 2,
			word: "good",
			learnState: true,
			dt: 0
		},
		{
			id: 3,
			word: "break",
			learnState: false,
			dt: 0
		},
		{
			id: 4,
			word: "controller",
			learnState: true,
			dt: 0
		},
		{
			id: 5,
			word: "book",
			learnState: true,
			dt: 0
		}
	]);
});

router.post('/change_learn_state', function(req, res) {
	res.status(200).json({
		status: true
	});
});

module.exports = router;