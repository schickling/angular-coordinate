'use strict';

angular.module('angular-coordinate', [])
	.directive('coordinate', function () {
		return {
			restrict: 'E',
			templateUrl: 'coordinate.html',
			link: function (scope, element, attrs) {

				var canvasElement, width, height, ctx, centerPoint, isDragging, scaleX, scaleY;

				function initAttibutes() {

					// scale
					scaleX = attrs.scaleX || 100;
					scaleY = attrs.scaleY || 100;

					// width
					width = attrs.width || '700';
					if (width.slice(-1) !== '%') {
						width += 'px';
					}

					// height
					height = attrs.height || '400';
					if (height.slice(-1) !== '%') {
						height += 'px';
					}

					// center point (0, 0)
					centerPoint = [width / 2, height / 2];

				}

				function initElement() {
					var coordinateElement = element[0];

					canvasElement = coordinateElement.getElementsByTagName('canvas')[0];
					ctx = canvasElement.getContext('2d');

					coordinateElement.style.width = canvasElement.style.width = width;
					coordinateElement.style.height = canvasElement.style.height = height;
					coordinateElement.style.display = 'block';

				}

				function initListeners() {
					initScrollListener();
					initDragAndDropListener();
				}

				function initScrollListener() {

				}

				function initDragAndDropListener() {

					function mouseMove(e) {
						if (isDragging) {
							console.log(e);
						}
					}

					function mouseDown(e) {
						isDragging = true;
						canvasElement.onmousemove = mouseMove;
					}

					function mouseUp() {
						isDragging = false;
						canvasElement.onmousemove = null;
					}

					canvasElement.onmousedown = mouseDown;
					canvasElement.onmouseup = mouseUp;
				}

				function provideApi() {

					if (attrs.api) {
						scope.$parent[attrs.api] = new api();
					}
				}

				function api() {
					return {
						drawPoint: function (x, y) {
							//ctx.
						}
					}
				}

				function draw() {

				}

				initAttibutes();
				initElement();
				initListeners();
				provideApi();
				draw();

			}
		};
	});