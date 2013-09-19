'use strict';

angular.module('angular-coordinate', [])
	.directive('coordinate', function () {
		return {
			restrict: 'E',
			templateUrl: 'coordinate.html',
			link: function (scope, element, attrs) {

				var canvasElement, width, height, ctx, centerPoint;

				function initElement() {
					var coordinateElement = element[0];

					width = attrs.width || '700';
					height = attrs.height || '400';
					centerPoint = [width/2, height/2];
					canvasElement = coordinateElement.getElementsByTagName('canvas')[0];
					ctx = canvasElement.getContext('2d');

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

					if (attrs.api) {
						scope.$parent[attrs.api] = new api();
					}
				}

				function api () {
					return {
						drawPoint: function(x,y) {
							//ctx.
						}
					}
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