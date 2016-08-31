var express = require('express'),
	router = express.Router(),
	User = require('../models/user'),
	Book = require('../models/book'),
	Unit = require('../models/unit'),
	Word = require('../models/word'),
	ObjectID = require('mongodb').ObjectID,
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
	var USER = req.session.user;
	res.status(200).json({
		userName: USER.userName,
		curBookId: USER.curBookId,
		curUnitId: USER.curUnitId
	});
});

// 获取教材信息
router.get('/books_info', function(req, res) {
	Book.getAllByEditionId("57b167ea4407383982740297", function(err, books) {
		if(err) {
			res.status(200).json(err);
		}
		
		res.status(200).json({
			editionName: '人教版',
			books: books
		});
	});
});

// 选书本
router.post('/choose_book', function(req, res) {
	var USER = req.session.user;
	var curBookId = ObjectID(req.body.bookId);

	// 更新当前书本
	User.update(USER.email, {curBookId: curBookId}, function(err) {
		if(err) {
			res.status(200).json(err);
		}

		// 如果更新了数据库的curBookId，也要更新session里的curBookId
		USER.curBookId =  curBookId;
		console.log('用户当前所学书本curBookId更新完毕: ', curBookId);
		res.status(200).json({
			success: true,
			msg: '当前书本更新成功！'
		});
	});
});

// 获取单元信息
router.get('/units_info', function(req, res) {
	var USER = req.session.user;
	// 获取书本信息
	Book.get(USER.curBookId, function(err, book) {
		if(err) {
			res.status(200).json(err);
		}

		// 获取当前书本下的所有单元
		Unit.getAllByBookId(USER.curBookId, function(err, units) {
			if(err) {
				res.status(200).json(err);
			}

			res.status(200).json({
				bookName: book.name,
				units: units
			});
		});
	});
});

// 选择单元
router.post('/choose_unit', function(req, res) {
	var USER = req.session.user;
	var curUnitId = ObjectID(req.body.unitId);

	// 更新当前书本
	User.update(USER.email, {curUnitId: curUnitId}, function(err) {
		if(err) {
			res.status(200).json(err);
		}

		// 如果更新了数据库的curBookId，也要更新session里的curBookId
		USER.curUnitId =  curUnitId;
		console.log('用户当前所学单元curUnitId更新完毕: ', curUnitId);
		res.status(200).json({
			success: true,
			msg: '当前单元更新成功！'
		});
	});
});

// 获取部分信息
/*router.get('/parts_info', function(req, res) {
	var USER = req.session.user;

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
});*/

// 选择部分
/*router.get('/choose_part', function(req, res) {
	// res.status(200).json([
	// 	{
	// 		part: 1,
	// 		hasLearned: 2,
	// 		total: 15
	// 	},
	// 	{
	// 		part: 2,
	// 		hasLearned: 3,
	// 		total: 15
	// 	}
	// ]);
});*/

// 获取单词列表
router.get('/words_list', function(req, res) {
	var USER = req.session.user;

	// 根据单元id获取单词列表
	Word.getAllSimpleByUnitId(USER.curUnitId, function(err, wordsList) {
		if(err) {
			res.status(200).json(err);
		}

		res.status(200).json(wordsList);
	});
});

// 更改单词学习状态
router.post('/change_learn_state', function(req, res) {
	var reqData = req.body;

	Word.update(reqData.id, {learnState: reqData.learnState}, function(err) {
		if(err) {
			res.status(200).json(err);
		}

		console.log('单词：' + reqData.id + '状态：' + reqData.learnState +'----更新完毕！');
		res.status(200).json({
			success: true,
			msg: '单词状态更新成功！'
		});
	});
});

module.exports = router;