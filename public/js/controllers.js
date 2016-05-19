/**
 * [mainApp的控制器]
 * @author Lesty
 * @codeDate 2016.5.10
 */
var mainControllers = angular.module('mainControllers', []),
	selectControllers = angular.module('selectControllers', []),
	typeControllers = angular.module('typeControllers', []);


/**
 * [mainControllers控制器]
 */
mainControllers.controller('welcomeCtrl', ['$scope', function($scope) {
	//
}]);

mainControllers.controller('loginCtrl', ['$scope', function($scope) {
	//
}]);

mainControllers.controller('registerCtrl', ['$scope', function($scope) {
	//
}]);

/**
 * [selectControllers控制器]
 */
selectControllers.controller('booksCtrl', ['$scope', '$rootScope', '$http', 'selectInfo', '$location', function($scope, $rootScope, $http, selectInfo, $location) {
	$rootScope.moduleTitle = '教材选择';

	$http.post('/select/books_info').then(function(res) {
		$scope.books = res.data;
	});

	$scope.chooseBook = function(bookId) {
		selectInfo.setCurBookId(bookId);
	};
}]);

selectControllers.controller('unitsCtrl', ['$scope', '$rootScope', '$http', '$routeParams', 'selectInfo', function($scope, $rootScope, $http, $routeParams, selectInfo) {
	$rootScope.moduleTitle = '单元选择';
	$scope.curBookId = selectInfo.getCurBookId();

	$http.post('/select/choose_book', {bookId: $scope.curBookId}).then(function(res) {
		$scope.units = res.data.units;
		angular.forEach($scope.units, function(item, index, arr) {
			arr[index].progress = parseInt(item.hasLearned / item.total * 100, 10);
		});
	});

	$scope.chooseUnit = function(uid) {
		selectInfo.setCurUnitId(uid);
	};
}]);

selectControllers.controller('partsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.moduleTitle = '部分选择';
}]);

selectControllers.controller('wordListCtrl', ['$scope', '$rootScope', '$http', '$routeParams', 'selectInfo', function($scope, $rootScope, $http, $routeParams, selectInfo) {
	$rootScope.moduleTitle = '单词列表';
	$scope.uid = selectInfo.getCurUnitId();
	// 用户是否已经学过该部分
	$scope.hasLearned = false;
	// 根据isAlert判断警告框是否弹出
	$scope.isAlert = false;
	// 提示语句
	$scope.alertSentence = '';

	// 带上日期参数，避免缓存
	$http.get('/select/choose_part', {params: {
		uid: $scope.uid,
		date: +new Date()
	}}).then(function(res) {
		let tmpWord = null;

		$scope.wordList = res.data;
		// 遍历分数,如果有分数就为false(现在还没弄)
		
		// 如果做题次数，则代表学过，
		for(let i = $scope.wordList.length; i--;) {
			tmpWord = $scope.wordList[i];

			if(tmpWord.dt !== 0) {
				$scope.hasLearned = true;
				// 弹出提示
				$scope.isAlert = true;
				$scope.alertSentence = '亲，您已学过一部分该单元内容，不能更改单词学习状态了哦T_T';
				break;
			}
		}
	});

	/**
	 * [changeWordState 改变wordList里单词的学习状态]
	 * @param  {String} word [要改变状态的单词]
	 */
	$scope.changeWordState = function(word) {
		// 临时对象
		let tmpWord = null;

		for(let i = $scope.wordList.length; i--;) {
			tmpWord = $scope.wordList[i];
			if(tmpWord.word === word) {
				// 修改学习状态
				$scope.wordList[i].learnState = !tmpWord.learnState;

				// 发送修改请求
				$http.post('/select/change_learn_state', {
					id: tmpWord.id,
					learnState: $scope.wordList[i].learnState
				}).then(function(res) {
					// do some thing with res.data
				}, function(err) {
					// 请求出错，弹出警告框
					$scope.isAlert = true;
					$scope.alertSentence = '亲，您的网络状况不佳T_T';
				});

				break;
			}
		}
	};

	/**
	 * [closeAlert 关闭警告框]
	 */
	$scope.closeAlert = function() {
		$scope.isAlert = false;
	};
}]);

selectControllers.controller('infoCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.moduleTitle = '个人中心';
}]);

/**
 * [typeControllers控制器]
 */
typeControllers.controller('doTypeCtrl', ['$scope', '$rootScope', '$http', 'selectInfo', 'Types', function($scope, $rootScope, $http, selectInfo, Types) {
	$rootScope.moduleTitle = '单元学习';

	let curIndex = -1,
		data = 0,
		dataLen = 0;

	$http.get('/type/get_words_detail', {
		params: {
			date: +new Date()
		}
	}).then(function(res) {
		data = Types.deepCopy(res.data);

		angular.forEach(data, function(item, index, arr) {
			// 如果不学该单词，则删除
			if(item.learnState === false || item.scope === 3) {
				arr.splice(index, 1);
			}

			// 创建干扰项
			Types.createRandomPic(res.data, arr[index]);
			Types.createRandomMean(res.data, arr[index]);
		});

		dataLen = data.length;

		$scope.toNextWord();
	});


	/**
	 * [toNextType 跳到下一题型]
	 */
	$scope.toNextType = function() {
		if($scope.curType === 'type3') {
			$scope.toNextWord();
		} else {

		}
		switch ($scope.curWord.score) {
			case 0:
				$scope.curType = 'type1';
				break;
			case 1:
				$scope.curType = 'type2';
				break;
			case 2:
				$scope.curType = 'type3';
				break;
			default:
				console.log('score不合法!');
				break;
		}
	};

	/**
	 * [toNextWord 跳转到下一题型]
	 */
	$scope.toNextWord = function() {
		if(++curIndex < dataLen) {
			$scope.curWord = data[curIndex];
			$scope.toNextType();
		} else {
			// 跳转
		}		
	}
}]);

typeControllers.controller('endCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.moduleTitle = '学习完成';
}]);