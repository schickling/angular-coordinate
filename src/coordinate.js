'use strict';

angular.module('angular-coordinate', [])
	.directive('coordinate', function () {
		return {
			restrict: 'E',
			templateUrl: 'coordinate.html',
			link: function (scope, element, attrs) {

				var canvasElement, width, height;

				function initElement() {
					var coordinateElement = element[0];

					width = attrs.width || '700';
					height = attrs.height || '400';
					canvasElement = coordinateElement.getElementsByTagName('canvas')[0];

					if (width.slice(-1) !== '%') {
						width += 'px';
					}

					if (height.slice(-1) !== '%') {
						height += 'px';
					}

					coordinateElement.style.width = canvasElement.style.width = width;
					coordinateElement.style.height = canvasElement.style.height = height;
					coordinateElement.style.display = 'block';

				}

				function initListeners() {

				}

				function provideApi() {

				}

				function draw() {

				}

				initElement();
				initListeners();
				provideApi();
				draw();

			}
		};
	});