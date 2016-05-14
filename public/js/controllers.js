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
selectControllers.controller('booksCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
	$rootScope.moduleTitle = '教材选择';
	$http.post('/select/books_info').then(function(res) {
		$scope.books = res.data;
	});
}]);

selectControllers.controller('unitsCtrl', ['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {
	$rootScope.moduleTitle = '单元选择';
	$scope.curBookId = $routeParams.bookId;
	$http.post('/select/choose_book').then(function(res) {
		$scope.units = res.data.units;
	});

}]);

selectControllers.controller('partsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.moduleTitle = '部分选择';
}]);

selectControllers.controller('wordListCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.moduleTitle = '单词列表';
}]);

selectControllers.controller('infoCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	$rootScope.moduleTitle = '个人中心';
}]);