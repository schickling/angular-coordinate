'use strict';

angular.module('coordinateApp', ['angular-coordinate'])
	.controller('DemoCtrl', function ($scope) {
		setTimeout(function () {
			var points = [[0,0], [1,1], [2,1]]
			points.forEach(function(point) {
				$scope.coordinate.addPoint(point[0],point[1]);
			});
			$scope.coordinate.addFunction('x^2');
		},1000);


	});