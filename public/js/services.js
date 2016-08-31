/**
 * [services自定义服务]
 * @author Lesty
 * @codeDate 2016.5.16
 */

var globalInfoServices = angular.module('globalInfoServices', []);
var typeServices = angular.module('typeServices', []);

globalInfoServices.factory('selectInfo', function() {
	var curBookId = 0, // 当前所选的教材ID
		curUnitId = 0, // 当前所选单元ID
		curPart = 0; // 当前所选部分

	/**
	 * [setter and getter]
	 */
	function getCurBookId() {
		return curBookId;
	}

	function setCurBookId(bookId) {
		curBookId = bookId;
	}

	function getCurUnitId() {
		return curUnitId;
	}

	function setCurUnitId(unitId) {
		curUnitId = unitId;
	}

	function getCurPart() {
		return curPart;
	}

	function setCurPart(part) {
		curPart = part;
	}

	return {
		getCurBookId: getCurBookId,
		setCurBookId: setCurBookId,
		getCurUnitId: getCurUnitId,
		setCurUnitId: setCurUnitId,
		getCurPart: getCurPart,
		setCurPart: setCurPart
	};
});

typeServices.factory('Types', function() {
	// 预备的干扰图
	var fallbackPic = [
	    'http://pic1.hebei.com.cn/0/12/05/25/12052571_010153.jpg',
	    'http://img5.imgtn.bdimg.com/it/u=1442159604,838517873&fm=21&gp=0.jpg',
	    'http://d03.res.meilishuo.net/pic/_o/59/db/ece7c364542204213522e5b503dd_600_600.c1.jpg',
	    'http://d01.res.meilishuo.net/pic/_o/b2/5c/145fa608d3c2e50842b75fe03802_800_800.jpg',
	    'http://i.zeze.com/attachment/forum/201508/10/130318ay5k9iyblyvzby8w.jpg',
	    'http://pic.58pic.com/58pic/13/28/85/66m58PICVed_1024.jpg'
	];

	// 预备的干扰词
	var fallbackMean = [
		'n. 插座',
		'v. 奔跑;跑',
		'adj. 崩溃的',
		'adj. 紧急',
		'n. 睡袋',
		'v. 释放;解除'
	];

	/**
	 * [createRandomPic 为当前对象添加随机干扰图]
	 * @param  {Array} data   [所有单词的详细信息]
	 * @param  {Array} newObj [要添加干扰图的对象]
	 */
	function createRandomPic (data, newObj) {
	    var i = 1,
	    	// 干扰选项所在位置
	    	randNum = 0,
	    	// 正确选项所在位置
	    	randOption = Math.floor(Math.random() * 4) + 1,
	    	// 当前图片路径
	    	curPic = '',
	    	// 随机的图片路径
	    	randPic = '',
	    	// 已经选中的选项集合
			randList = new Object();

	    // 保存正确选项
	    newObj["picOption" + randOption] = newObj.p2;
	    curPic = newObj.p2;

	    while (i < 5) {
	        // 如果i索引到了正确项所在位置，则跳过，并指向下一个选项位置
	        if (i == randOption) {
	            i++;
	            continue;
	        }

	        // 获取[0~数据长度)间随机整数，用于筛选干扰图
	        randNum = Math.floor(Math.random() * (data.length >= 5 ? data.length: fallbackPic.length));
	        // 判断干扰图是否已被选择过
	        if (randNum in randList) {
	            continue;
	        }

	        // 获取干扰图
	        randPic = (data.length >= 5 ? data[randNum].p2 : fallbackPic[randNum]);
	        // 判断所选干扰图和正确答案是否相同
	        if(randPic !== curPic) {
	        	randList[randNum] = randNum;
	        	// 保存干扰图
	        	newObj["picOption" + i] = randPic;
	        	i++;
	        }
	    }
	};

	function createRandomMean (data, newObj) {
	    var i = 1,
	    	// 干扰选项所在位置
	    	randNum = 0,
	    	// 正确选项所在位置
	    	randOption = Math.floor(Math.random() * 4) + 1,
	    	// 当前翻译
	    	curMean = '',
	    	// 随机的翻译
	    	randMean = '',
			randList = new Object();

	    // 保存正确选项
	    newObj["meanOption" + randOption] = newObj.wordMean;
	    curMean = newObj.wordMean;

	    while (i < 5) {
	        // 如果i索引到了正确项所在位置，则跳过，并指向下一个选项位置
	        if (i == randOption) {
	            i++;
	            continue;
	        }

	        // 获取[0~数据长度)间随机整数，用于筛选干扰项
	        randNum = Math.floor(Math.random() * (data.length >= 5 ? data.length: fallbackMean.length));
	        // 判断干扰项是否已被选择过
	        if (randNum in randList) {
	            continue;
	        }

	        // 获取干扰项
	        randMean = (data.length >= 5 ? data[randNum].wordMean : fallbackMean[randNum]);
	        // 判断干扰项和正确答案是否相同
	        if(randMean !== curMean) {
	        	randList[randNum] = randNum;
	        	// 保存干扰项
	        	newObj["meanOption" + i] = randMean;
	        	i++;
	        }
	    }
	};

	function deepCopy(obj) {
		return JSON.parse(JSON.stringify(obj));
	}

	return {
		createRandomPic: createRandomPic,
		createRandomMean: createRandomMean,
		deepCopy: deepCopy
	};
});