var typeDirectives = angular.module('typeDirectives', []);

typeDirectives.directive('stType1', function() {
	return {
		restrict: 'EA',
		templateUrl: './templates/type1.html'
	}
});