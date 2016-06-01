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
			wordAudio: './audios/hello.mp3',
			wordMean: 'int. 喂;哈罗',
			learnState: true,
			score: 0,
			sentence: 'hello world',
			sentenceAudio: './audios/hello-world.mp3',
			sentenceMean: '你好，世界！',
			// type1 picture
			p1: './imgs/hello-world.jpg',			
			// type2 picture
			p2: './imgs/hello-world.jpg',
			dt: 0
		},
		{
			id: 2,
			word: "good",
			wordAudio: './audios/hello.mp3',
			wordMean: 'int. 喂;哈罗',
			learnState: true,
			score: 1,
			sentence: 'good morning',
			sentenceAudio: './audios/hello-world.mp3',
			sentenceMean: '你好，世界！',
			// type1 picture
			p1: './imgs/hello-world.jpg',			
			// type2 picture
			p2: './imgs/hello-world.jpg',
			dt: 2
		},
		{
			id: 3,
			word: "break",
			wordAudio: './audios/hello.mp3',
			wordMean: 'int. 喂;哈罗',
			learnState: false,
			score: 0,
			sentence: 'break it',
			sentenceAudio: './audios/hello-world.mp3',
			sentenceMean: '你好，世界！',
			// type1 picture
			p1: './imgs/hello-world.jpg',			
			// type2 picture
			p2: './imgs/hello-world.jpg',
			dt: 0
		},
		{
			id: 4,
			word: "controller",
			wordAudio: './audios/hello.mp3',
			wordMean: 'int. 喂;哈罗',
			learnState: true,
			score: 0,
			sentence: 'There are some controllers',
			sentenceAudio: './audios/hello-world.mp3',
			sentenceMean: '你好，世界！',
			// type1 picture
			p1: './imgs/hello-world.jpg',			
			// type2 picture
			p2: './imgs/hello-world.jpg',
			dt: 0
		},
		{
			id: 5,
			word: "book",
			wordAudio: './audios/hello.mp3',
			wordMean: 'int. 喂;哈罗',
			learnState: true,
			score: 0,
			sentence: 'There are so many book',
			sentenceAudio: './audios/hello-world.mp3',
			sentenceMean: '你好，世界！',
			// type1 picture
			p1: './imgs/hello-world.jpg',			
			// type2 picture
			p2: './imgs/hello-world.jpg',
			dt: 0
		}
	]);
});

router.post('/update_done_date', function(req, res) {
    res.status(200).json({
    	status: true
    });
});

module.exports = router;
