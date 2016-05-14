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
		'selectControllers'
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
	}).when('/units/:bookId', {
		templateUrl: './templates/units.html',
		controller: 'unitsCtrl'
	}).when('/parts', {
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

selectApp.run(['$rootScope', '$http', function($rootScope, $http) {
	$rootScope.userName = 'Lesty';
}]);