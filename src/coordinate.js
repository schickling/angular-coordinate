'use strict';

angular.module('angular-coordinate', [])
	.directive('coordinate', function() {
		return {
			restrict: 'E',
			templateUrl: 'coordinate.html',
			compile: function(element, attrs) {
				function someApi(scope, element, attrs) {
					return {
						test: function () {
							console.log('Yeeaahaa');
						}
					}
				}
			},
			link: function(scope, element, attrs) {
				console.log('scope');
				scope.someContent = 'blub';
			}
		};
	});