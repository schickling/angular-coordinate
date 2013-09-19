'use strict';

angular.module('angular-coordinate', [])
	.directive('coordinate', function () {
		return {
			restrict: 'E',
			templateUrl: 'coordinate.html',
			link: function (scope, element, attrs) {

				var canvasElement, width, height, ctx, centerPoint, isDragging, scaleX, scaleY;

				function initAttibutes() {
					console.log(element);

					// scale
					scaleX = attrs.scaleX || 100;
					scaleY = attrs.scaleY || 100;

					// width
					width = parseInt(attrs.width, 10) || 700;
					if (attrs.width.slice(-1) === '%') {
						width *= 0.01;
						width *= element[0].parentElement.offsetWidth;
					}

					// height
					height = parseInt(attrs.height, 10) || 400;
					if (attrs.height.slice(-1) === '%') {
						height *= 0.01;
						height *= element[0].parentElement.offsetHeight;
					}

					// center point (0, 0)
					centerPoint = [width / 2, height / 2];

				}

				function initElement() {
					var coordinateElement = element[0];

					canvasElement = coordinateElement.getElementsByTagName('canvas')[0];
					canvasElement.width = width;
					canvasElement.height = height;
					ctx = canvasElement.getContext('2d');

					coordinateElement.style.width = width + 'px';
					coordinateElement.style.height = height + 'px';
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
					function drawCircle(radius, x, y, color) {
						ctx.beginPath();
						ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
						ctx.fillStyle = color;
						ctx.fill();
						ctx.closePath();
					}

					return {
						drawPoint: function (x, y) {
							drawCircle(3, x, y, '#1BE07E');
							drawCircle(9, x, y, 'rgba(0, 0, 0, 0.1)');
						}
					}
				}

				function draw() {
					drawXAxis();
					drawYAxis();
				}

				function drawXAxis() {
					ctx.beginPath();
					ctx.moveTo(0, centerPoint[1]);
					ctx.lineTo(width, centerPoint[1]);
					ctx.stroke();
				}

				function drawYAxis() {
					ctx.beginPath();
					ctx.moveTo(centerPoint[0], 0);
					ctx.lineTo(centerPoint[0], height);
					ctx.stroke();
				}

				initAttibutes();
				initElement();
				initListeners();
				provideApi();
				draw();

			}
		};
	});