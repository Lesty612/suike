var typeDirectives = angular.module('typeDirectives', []);

typeDirectives.directive('stType1', ['$scope', function($scope) {
	return {
		restrict: 'EA',
		templateUrl: './templates/type1.html'
	}
}]);