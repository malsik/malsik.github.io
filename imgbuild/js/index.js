var numberStage,
		stageImageCtx,
		stageImageWidth = 380,
		stageImageHeight = 414,
		stageImageOffsetX,
		stageImageOffsetY,

		stage,
		stageCtx,
		stageWidth = window.innerWidth,
		stageHeight = window.innerHeight,
		stageCenterX = stageWidth / 2,
		stageCenterY = stageHeight / 2,

		circleOuterRadius = 250,
		circlePoints = [],

		imageVisible = false,
		dots = [],
		imagePixelCoordinates,
		circleRadius = 2;


function init() {

		stageImage = document.getElementById("canvas-image");
		stageImageCtx = stageImage.getContext('2d');
		stageImage.width = stageImageWidth;
		stageImage.height = stageImageHeight;

		stage = document.getElementById("canvas-shapes");
		stageCtx = stage.getContext('2d');
		stage.width = stageWidth;
		stage.height = stageHeight;

		stageImageOffsetX = (stageWidth - stageImageWidth) / 2;
		stageImageOffsetY = (stageHeight - stageImageHeight) / 2;
}

init();


stage.addEventListener('click', function() {
		imageVisible = !imageVisible;
}, false);


function Dot(x, y, red, blue, green, imageX, imageY) {

		var _this = this;

		_this.x = x;
		_this.y = y;
		_this.red = red;
		_this.green = blue;
		_this.blue = green;
		_this.imageX = imageX;
		_this.imageY = imageY;

		this.draw = function() {
				stageCtx.beginPath();
				stageCtx.arc(_this.x, _this.y, circleRadius, 0, 2 * Math.PI, false);
				stageCtx.fillStyle = 'rgb(' + _this.red + ', ' + _this.green + ', ' + _this.blue + ')';
				stageCtx.fill();
		}

}


function loop() {

		stageCtx.clearRect(0, 0, stageWidth, stageHeight);

		for (var i = 0; i < dots.length; i++) {
				dots[i].draw(stageCtx);
		}

		requestAnimationFrame(loop);

}
loop();


drawImage();

function drawImage() {

		var img = new Image;
		img.crossOrigin = "Anonymous";
		img.src = 'https://i.imgur.com/EPODQDn.jpg';

		img.onload = function() {
				stageImageCtx.drawImage(img, 0, 0);
				getImageData();
		}

}


function getImageData() {

		var ctx = document.getElementById('canvas-image').getContext('2d');

		var imageData = ctx.getImageData(0, 0, stageImageWidth, stageImageHeight).data;

		imagePixelCoordinates = [];

		for (var i = imageData.length; i >= 0; i -= 4) {

				if (imageData[i] !== 0) {

						var x = (i / 4) % stageImageWidth;
						var y = Math.floor(Math.floor(i / stageImageWidth) / 4);

						if ((x && x % ((circleRadius * 2) + 1) == 0) && (y && y % ((circleRadius * 2) + 1) == 0)) {

								imagePixelCoordinates.push({
										x: x,
										y: y,
										red: imageData[i],
										green: imageData[i + 1],
										blue: imageData[i + 2]
								});

						}

				}
		}

		formImage();

}


function formImage() {

		for (var i = 0; i < imagePixelCoordinates.length; i++) {

				
				var p = Math.random(),
						x = stageCenterX + circleOuterRadius * Math.cos(2 * Math.PI * p),
						y = stageCenterY + circleOuterRadius * Math.sin(2 * Math.PI * p);

				circlePoints.push({
						x: x,
						y: y
				});
			
			
				
				var dot = new Dot(
						x,
						y,
						imagePixelCoordinates[i].red,
						imagePixelCoordinates[i].green,
						imagePixelCoordinates[i].blue,
						imagePixelCoordinates[i].x,
						imagePixelCoordinates[i].y
				);

				dots.push(dot);

				
				tweenDots(dots[i], circlePoints[i], 'circle');

		}

}


function tweenDots(dot, circlePos, type) {

		if (type === 'circle') {

				
				TweenLite.to(dot, (1.8 + Math.round(Math.random() * 100) / 100), {
						x: circlePos.x,
						y: circlePos.y,
						ease: Cubic.easeInOut,
						onComplete: function() {

								if (!imageVisible) {
										tweenDots(dot, circlePoints[randomNumber(0, circlePoints.length)], 'circle');
								} else {
										tweenDots(dot, '', '');
								}

						}
				});

		} else {

				
				TweenLite.to(dot, (0.4 + Math.round(Math.random() * 100) / 100), {
						x: (dot.imageX + stageImageOffsetX),
						y: (dot.imageY + stageImageOffsetY),
						ease: Cubic.easeInOut,
						onComplete: function() {

								if (!imageVisible) {
										tweenDots(dot, circlePoints[randomNumber(0, circlePoints.length)], 'circle');
								} else {
										tweenDots(dot, '', '');
								}

						}
				});

		}

}


function randomNumber(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
}