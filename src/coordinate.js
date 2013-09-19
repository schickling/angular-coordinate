'use strict';

angular.module('angular-coordinate', [])
	.directive('coordinate', function() {
		return {
			restrict: 'E',
			scope: true,
			templateUrl: 'src/coordinate.html'
			link: function(scope, element, attrs) {
				var sources = scope.ngModel;
				scope.someContent = 'Blablabla Mr. Freeman';
			}
	})