'use strict';

angular.module('angular-coordinate', [])
	.directive('coordinate', function () {
		return {
			restrict: 'E',
			templateUrl: 'coordinate.html',
			link: function (scope, element, attrs) {

				function initElement() {
					console.log(element);
					var coordinateElement = element[0],
						canvasElement = coordinateElement.getElementsByTagName('canvas')[0],
						width = attrs.width || '700',
						height = attrs.height || '400';

					if (width.slice(-1) !== '%') {
						width += 'px';
					}

					if (height.slice(-1) !== '%') {
						height += 'px';
					}

					coordinateElement.style.width = canvasElement.style.width = width;
					coordinateElement.style.height = canvasElement.style.height = height;
					coordinateElement.style.display = 'block';


					console.log(attrs);
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