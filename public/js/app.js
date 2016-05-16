/**
 * [app模块配置]
 * @author Lesty
 * @codeDate 2016.5.10
 */
var mainApp = angular.module('mainApp', [
		'ngRoute',
		'mainControllers'
	]);
var selectApp = angular.module('selectApp', [
		'ngRoute',
		'ngAnimate',
		'selectControllers',
		'globalInfoServices'
	]);

mainApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/welcome', {
		templateUrl: './templates/welcome.html',
		controller: 'welcomeCtrl'
	}).when('/login', {
		templateUrl: './templates/login.html',
		controller: 'loginCtrl'
	}).when('/register', {
		templateUrl: './templates/register.html',
		controller: 'registerCtrl'
	}).otherwise({
		redirectTo: '/welcome'
	});
}]);

selectApp. config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/books', {
		templateUrl: './templates/books.html',
		controller: 'booksCtrl'
	}).when('/units', {
		templateUrl: './templates/units.html',
		controller: 'unitsCtrl'
	}).when('/parts/:uid', {
		templateUrl: './templates/parts.html',
		controller: 'partsCtrl'
	}).when('/word-list', {
		templateUrl: './templates/word-list.html',
		controller: 'wordListCtrl'
	}).when('/info', {
		templateUrl: './templates/info.html',
		controller: 'infoCtrl'
	}).otherwise({
		redirectTo: '/units'
	});
}]);

selectApp.run(['$rootScope', '$http', 'selectInfo', function($rootScope, $http, selectInfo) {
	$http.get('/select/user_select_info', {params: {
		date: +new Date()
	}}).then(function(res) {
		var data = res.data;
		$rootScope.userName = data.userName;
		selectInfo.setCurBookId(data.curBookId);
		selectInfo.setCurUnitId(data.curUnitId);
	});
}]);