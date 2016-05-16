/**
 * [mainApp的控制器]
 * @author Lesty
 * @codeDate 2016.5.10
 */
var mainControllers = angular.module('mainControllers', []);
var selectControllers = angular.module('selectControllers', []);

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

	$scope.chooseBook = function(event, bookId) {
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


}]);

selectControllers.controller('partsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.moduleTitle = '部分选择';
}]);

selectControllers.controller('wordListCtrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {
	$rootScope.moduleTitle = '单词列表';
	$scope.uid = $routeParams.uid;
	$http.get('/select/choose_part').then(function(res) {
		$scope.wordList = res.data;
		// 遍历分数,如果有分数就为false(现在还没弄)
		$scope.hasLearned = true;
		angular.forEach($scope.wordList, function(item, index, arr) {
			arr[index].text = item.learnState === true ? "学" : "不学";
		});
	});
}]);

selectControllers.controller('infoCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.moduleTitle = '个人中心';
}]);