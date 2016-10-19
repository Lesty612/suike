var express = require('express'),
    router = express.Router(),
    Word = require('../models/word'),
    UserWord = require('../models/user_word');

/**
 * [做题模块的路由]
 * @author Lesty
 * @codeDate 2016.5.13
 */
router.get('/', function(req, res) {
	res.render('type');
});

// 获取相应单元下的单词详情列表
router.get('/get_words_detail', function(req, res) {
	var USER = req.session.user;
	Word.getAll(USER._id, USER.curUnitId, function(err, wordsDetail) {
		if(err) {
			res.status(200).json(err);
		}

		res.status(200).json(wordsDetail);
	});
	// res.status(200).json([
	// 	{
	// 		id: 1,
	// 		word: "hello",
	// 		wordAudio: './audios/hello.mp3',
	// 		wordMean: 'int. 喂;哈罗',
	// 		learnState: true,
	// 		score: 0,
	// 		sentence: 'hello world',
	// 		sentenceAudio: './audios/hello-world.mp3',
	// 		sentenceMean: '你好，世界！',
	// 		// type1 picture
	// 		p1: './imgs/hello-world.jpg',			
	// 		// type2 picture
	// 		p2: './imgs/hello-world.jpg',
	// 		dt: 0
	// 	},
	// 	{
	// 		id: 2,
	// 		word: "good",
	// 		wordAudio: './audios/good.mp3',
	// 		wordMean: 'adj. 好的;优秀的',
	// 		learnState: true,
	// 		score: 1,
	// 		sentence: 'good morning',
	// 		sentenceAudio: './audios/good-morning.mp3',
	// 		sentenceMean: '早上好！',
	// 		// type1 picture
	// 		p1: './imgs/good-p1.jpg',			
	// 		// type2 picture
	// 		p2: './imgs/good-p1.jpg',
	// 		dt: 2
	// 	},
	// 	{
	// 		id: 3,
	// 		word: "break",
	// 		wordAudio: './audios/break.mp3',
	// 		wordMean: 'vt. (使)破;打破(纪录)',
	// 		learnState: false,
	// 		score: 0,
	// 		sentence: 'break it',
	// 		sentenceAudio: './audios/break-it.mp3',
	// 		sentenceMean: '打破它',
	// 		// type1 picture
	// 		p1: './imgs/break-p1.jpg',			
	// 		// type2 picture
	// 		p2: './imgs/break-p2.jpg',
	// 		dt: 0
	// 	},
	// 	{
	// 		id: 4,
	// 		word: "controller",
	// 		wordAudio: './audios/controller.mp3',
	// 		wordMean: 'n. 管理者;控制器',
	// 		learnState: true,
	// 		score: 0,
	// 		sentence: 'There are some controllers',
	// 		sentenceAudio: './audios/controller-sentence.mp3',
	// 		sentenceMean: '那里有一些控制器',
	// 		// type1 picture
	// 		p1: './imgs/controller-p1.jpg',			
	// 		// type2 picture
	// 		p2: './imgs/controller-p2.jpg',
	// 		dt: 0
	// 	},
	// 	{
	// 		id: 5,
	// 		word: "book",
	// 		wordAudio: './audios/book.mp3',
	// 		wordMean: 'n. 书本;图书\r\nv. 预定',
	// 		learnState: true,
	// 		score: 0,
	// 		sentence: 'There are so many book',
	// 		sentenceAudio: './audios/book-sentence.mp3',
	// 		sentenceMean: '那里有很多书本',
	// 		// type1 picture
	// 		p1: './imgs/book-p1.jpg',			
	// 		// type2 picture
	// 		p2: './imgs/book-p2.jpg',
	// 		dt: 0
	// 	}
	// ]);
});

router.post('/update_done_date', function(req, res) {
	var USER = req.session.user;
	var reqData = req.body;

	UserWord.update(USER._id, reqData.wordId, {
		learnState: true,
		score: reqData.score,
		dt: reqData.dt
	}, function(err) {
		if(err) {
			res.status(200).json(err);
		}

		console.log('单词id：' + reqData.wordId + ' score:' + reqData.score + ' dt:' + reqData.dt + '----更新完毕！');
		res.status(200).json({
			success: true,
			msg: '单词状态更新成功！'
		});
	});
});

module.exports = router;
