'use strict';

angular.module('coordinateApp', ['angular-coordinate'])
	.controller('DemoCtrl', function ($scope) {
		setTimeout(function () {
			$scope.coordinate.drawPoint(200,200);

		},1000);


	});