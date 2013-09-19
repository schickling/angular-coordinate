'use strict';

angular.module('angular-coordinate', [])
	.directive('coordinate', function() {
		return {
			restrict: 'E',
			scope: true,
			transclude: false,
			replace: false,
			templateUrl: 'src/coordinate.html'
			compile: function(scope, element, attrs) {
				var sources = scope.ngModel;
				scope.someContent = 'Blablabla Mr. Freeman';
				function someApi(scope, element, attrs) {
					return {
						test: function () {
							console.log('Yeeaahaa');
						}
					}
				}
				scope.api = new someApi();
			}
	})