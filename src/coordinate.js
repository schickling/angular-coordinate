'use strict';

angular.module('angular-coordinate', [])
	.directive('coordinate', function () {
		return {
			restrict: 'E',
			templateUrl: 'coordinate.html',
			link: function (scope, element, attrs) {

				var canvasElement, width, height, ctx, centerPoint,
						isDragging, scaleX, scaleY, dragPoint, api,
						points = [],
						functions = [];

				function initAttibutes() {

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
							drag(e);
							dragPoint = [e.offsetX, e.offsetY];
						}
					}

					function mouseDown(e) {
						isDragging = true;
						dragPoint = [e.offsetX, e.offsetY];
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
						api = new coordinateApi();
						scope.$parent[attrs.api] = api;
					}
				}

				function coordinateApi() {
					return {
						addPoint: function (x, y) {
							drawPoint(x, y);
							//register the point for redrawing when moving
							registerPoint(x, y);
						},
						addFunction: function (functionString) {
							drawFunction(functionString);
							registerFunction(functionString);
						}
					}
				}

				function drawFunction(functionString) {
					var scope = {x: 0}
					var node = math.parse(functionString, scope);

					ctx.beginPath();
					for (var x = 0; x < width; x = x + 1) {
						scope.x = pixelToXY(x).x;
						var y = node.eval();
						ctx.lineTo(x,XYtoPixel(0,y).y);
					}
					ctx.stroke();
				}

				function drawPoint(x, y) {
					drawCircle(3, x, y, '#1BE07E');
					drawCircle(9, x, y, 'rgba(0, 0, 0, 0.1)');

					function drawCircle(radius, x, y, color) {
						var trans = XYtoPixel(x, y);
						ctx.beginPath();
						ctx.arc(trans.x, trans.y, radius, 0, 2 * Math.PI, true);
						ctx.fillStyle = color;
						ctx.fill();
						ctx.closePath();
					}
				}

				function XYtoPixel (x, y) {
					return {
						x: x * scaleX + centerPoint[0],
						y: (-1) * y * scaleY + centerPoint[1]
					}
				}

				function pixelToXY (pixelX, pixelY) {
					return {
						x: (pixelX - centerPoint[0]) / scaleX,
						y: (pixelY - centerPoint[1]) / scaleY
					}
				}

				function registerPoint (x, y) {
					points.push([x,y]);
				}

				function drawPoints() {
					for (var i = 0, max = points.length; i < max; i = i + 1) {
						var point = points[i];
						drawPoint(point[0], point[1]);
					}
				}

				function registerFunction (functionString) {
					functions.push(functionString);
				}

				function drawFunctions() {
					for (var i = 0, max = functions.length; i < max; i = i + 1) {
						var func = functions[i];
						drawFunction(func);
					}
				}

				function drag(e) {
					var diffX = e.offsetX - dragPoint[0],
						diffY = e.offsetY - dragPoint[1];

					centerPoint[0] += diffX;
					centerPoint[1] += diffY;
					draw();
				}

				function draw() {
					reset();
					drawXAxis();
					drawYAxis();
					drawPoints();
					drawFunctions();
				}

				function reset() {
					ctx.clearRect(0, 0, width, height);
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