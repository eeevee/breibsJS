var SpriteSheet = function(width, height, image, speed)
{
	Sprite.call(this, width, height, image);

	var currentFrame = 0;
	var count = 0;
	var framesPerRow = Math.floor(image.width / this.width);
	var speed = speed;

	this.animations = {}; //32x 41
	this.currentAnimation = '';

	this.update = function() {
		count ++;
		if (count < speed) return;
		if (count == speed) count = 0;
		currentFrame ++;
		if (false) {

		} else {
			if (currentFrame >= (this.image.width / this.width) * (this.image.height / this.height)) {
				currentFrame = 0;
			}
		}
	};

	this.getCol = function() {
		return Math.floor(currentFrame % framesPerRow);
	};

	this.getRow = function() {
		return Math.floor(currentFrame / framesPerRow);
	};
};