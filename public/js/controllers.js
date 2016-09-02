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

mainControllers.controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
	// 登录用户的信息
	$scope.loginUser = {};
	// 错误提示
	$scope.errorMsg = '';
	// 表单发送状态，用于控制提交按钮disabled属性
	$scope.sendState = 'over';

	// 提交表单
	$scope.login = function(event) {
		// 修改发送状态
		$scope.sendState = 'sending';

		// 阻止表单默认事件
	    event.preventDefault();
		// 停止当前元素后续事件并阻止冒泡
		event.stopImmediatePropagation();

		$http.post('login', $scope.loginUser).then(function(res) {
			// 获取返回数据
			var data = res.data;
			// 修改发送状态
			$scope.sendState = 'over';

			// 存在url就跳转
			if(data.url) {
				window.location.href = window.location.origin + data.url;
			} else {
				// 显示错误信息
				$scope.errorMsg = res.data.msg || '';
			}
		}, function(err) {
		    // error
		});
	}
}]);

mainControllers.controller('registerCtrl', ['$scope', '$http', function($scope, $http) {
	// 注册用户的信息
	$scope.regUser = {};
	// 错误提示
	$scope.errorMsg = '';
	// 表单发送状态，用于控制提交按钮disabled属性
	$scope.sendState = 'over';

	// 提交表单
	$scope.regist = function(event) {
		// 修改发送状态
		$scope.sendState = 'sending';

		// 阻止表单默认事件
	    event.preventDefault();
		// 停止当前元素后续事件并阻止冒泡
		event.stopImmediatePropagation();

		$http.post('register', $scope.regUser).then(function(res) {
			// 获取返回数据
			var data = res.data;
			// 修改发送状态
			$scope.sendState = 'over';

			// 存在url就跳转
			if(data.url) {
				window.location.href = window.location.origin + data.url;
			} else {
				// 显示错误信息
				$scope.errorMsg = res.data.msg || '';
			}
		}, function(err) {
		    // error
		});
	}
}]);

/**
 * [selectControllers控制器]
 */
selectControllers.controller('booksCtrl', ['$scope', '$rootScope', '$http', '$location', 'selectInfo', function($scope, $rootScope, $http, $location, selectInfo) {
	// 获取所有教材信息
	$http.get('/select/books_info').then(function(res) {
		var data = res.data;
		$rootScope.moduleTitle = data.editionName + '-教材选择';
		$scope.books = data.books;
	});

	$scope.chooseBook = function(bookId) {
		console.log(bookId);
		// 选择书本
		$http.post('/select/choose_book', {bookId: bookId}).then(function(res) {
			$location.path('/units');
		});
		// 设置当前bookId
		selectInfo.setCurBookId(bookId);
	};
}]);

selectControllers.controller('unitsCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams', 'selectInfo', function($scope, $rootScope, $http, $location, $routeParams, selectInfo) {
	// 获取所有单元信息
	$http.get('/select/units_info').then(function(res) {
		var data = res.data;
		$rootScope.moduleTitle = data.bookName + '-单元选择';
		$scope.units = data.units;
		
		angular.forEach($scope.units, function(item, index, arr) {
			arr[index].progress = parseInt(item.hasLearned / item.total * 100, 10);
		});
	});

	$scope.chooseUnit = function(unitId) {
		// 选择单元
		$http.post('/select/choose_unit', {unitId: unitId}).then(function(res) {
			$location.path('/word-list');
		});

		selectInfo.setCurUnitId(unitId);
	};
}]);

selectControllers.controller('partsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.moduleTitle = '部分选择';
}]);

selectControllers.controller('wordListCtrl', ['$scope', '$rootScope', '$http', '$routeParams', 'selectInfo', function($scope, $rootScope, $http, $routeParams, selectInfo) {
	$rootScope.moduleTitle = '单词列表';
	// 用户是否已经学过该部分
	$scope.hasLearned = false;
	// 根据isAlert判断警告框是否弹出
	$scope.isAlert = false;
	// 提示语句
	$scope.alertSentence = '';

	// 获取单词列表
	$http.get('/select/words_list').then(function(res) {
		var tmpWord = null;

		$scope.wordList = res.data;
		// 遍历分数,如果有分数就为false(现在还没弄)
		
		// 如果有做题次数，则代表学过
		for(var i = $scope.wordList.length; i--;) {
			tmpWord = $scope.wordList[i];

			if(tmpWord.dt && tmpWord.dt !== 0) {
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
	 * @param  {String} wordId [要改变状态的单词Id]
	 */
	$scope.changeWordState = function(wordId) {
		// 临时对象
		var tmpWord = null;

		for(var i = $scope.wordList.length; i--;) {
			tmpWord = $scope.wordList[i];
			if(tmpWord.wordId === wordId) {
				// 修改学习状态
				$scope.wordList[i].learnState = !tmpWord.learnState;

				// 发送修改请求
				$http.post('/select/change_learn_state', {
					id: wordId,
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
	$scope.isAlert = false;

	var curIndex = -1, // 当前单词位置索引
		data = 0, // 所有单词详细信息[数组]
		dataLen = 0, // 需要学习的单词数量
		pTotal = 0, // 全部单词的数据数量
		pCurCount = 0,	// 学完的单词数量(整单元)
		dt = 0; // 做题次

	$http.get('/type/get_words_detail', {
		params: {
			date: +new Date()
		}
	}).then(function(res) {
		data = Types.deepCopy(res.data);
		pTotal = data.length;

		angular.forEach(data, function(item, index, arr) {
			// 如果不学该单词，则删除
			if(item.learnState === false || item.scope === 3) {
				arr.splice(index, 1);
				pCurCount++;
			}

			// 创建干扰项
			Types.createRandomPic(res.data, arr[index]);
			Types.createRandomMean(res.data, arr[index]);
		});

		dataLen = data.length;

		$scope.progress = parseInt(pCurCount / pTotal * 100, 10);

		// 载入第一个单词
		$scope.toNextWord();
	}, function(err) {
		$scope.isAlert = true;
		$scope.alertSentence = '亲，数据加载失败啦~请您刷新页面重试T_T';
	});


	/**
	 * [toNextType 跳到下一题型]
	 * @nextType {String} [如果指定了nextType，则按照默认顺序出题]
	 */
	$scope.toNextType = function(nextType) {
		if(nextType != null) {
			$scope.curType = nextType;
		} else {
			if($scope.curType === 'type3') {
				// 做完一个单词，完成总数+1
				$scope.progress = parseInt(++pCurCount / pTotal * 100, 10);
				$scope.toNextWord();
			} else {
				$scope.curType = 'type' + (parseInt($scope.curType.slice($scope.curType.length - 1), 10) + 1);
			}
		}
	};

	/**
	 * [toNextWord 跳转到下一单词]
	 */
	$scope.toNextWord = function() {
		// 下一个题型
		var nextType = '';

		// 跳到下一单词时，将当前单词学习情况发送到后台
		if(curIndex >= 0) {
			$http.post('/type/update_done_date', {
				id: data[curIndex].id,
				dt: dt
			}).then(function(res) {
				// success
			}, function(err) {
				$scope.isAlert = true;
				$scope.alertSentence = '亲，您的网络状况不佳，学习数据可能保存失败哦T_T';
			});
		}

		if(++curIndex < dataLen) {
			$scope.curWord = data[curIndex];
			dt = 0;

			// 根据单词分数判断题型
			switch ($scope.curWord.score) {
				case 0:
					nextType = 'type1';
					break;
				case 1:
					nextType = 'type2';
					break;
				case 2:
					nextType = 'type3';
					break;
				default:
					console.log('score不合法!');
					break;
			}

			$scope.toNextType(nextType);
		} else {
			// 显示结束页面
			$scope.curType = 'end';
			dt = 0;
			curIndex = -1;
		}		
	}

	/**
	 * [closeAlert 关闭警告框]
	 */
	$scope.closeAlert = function() {
		$scope.isAlert = false;
	};

	/**
	 * [playAudio 播放音频]
	 */
	$scope.playAudio = function() {
		var audio = $('audio')[0];
		audio != null && (audio.play());
	};
}]);

typeControllers.controller('endCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.moduleTitle = '学习完成';
}]);
