'use strict';

angular.module('angular-coordinate', [])
	.directive('coordinate', function() {
		return {
			restrict: 'E',
			templateUrl: 'coordinate.html',
			link: function(scope, element, attrs) {
				scope.someContent = 'blub';
			}
		};
	});