/**
 * [app模块配置]
 * @author Lesty
 * @codeDate 2016.5.10
 */
var mainApp = angular.module('mainApp', [
		'ngRoute',
		'mainControllers'
	]);
var userApp = angular.module('userApp', []);

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