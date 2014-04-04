var SpriteSheet = function(width, height, image, speed)
{
	Sprite.call(this, width, height, image);

	var currentFrame = 0;
	var animationCount = 0;
	var count = 0;
	var framesPerRow = Math.floor(image.width / this.width);
	var speed = speed;

	this.animations = {};
	this.currentAnimation = '';

	this.update = function() {
		count ++;
		if (count < speed) return;
		if (count == speed) count = 0;
		
		if (this.currentAnimation.length) {
			var animation = this.animations[this.currentAnimation];
			animationCount ++;
			if (animationCount >= animation.frames.length) {
				if (animation.hasOwnProperty('next')) {
					this.setCurrentAnimation(animation['next']);
				} else {
					animationCount = 0;
				}	
			}
			currentFrame = animation.frames[animationCount];
		} else {
			currentFrame ++;
			if (currentFrame >= (this.image.width / this.width) * (this.image.height / this.height)) {
				currentFrame = 0;
			}
		}
	};

	this.setCurrentAnimation = function(animation) {
		this.currentAnimation = animation;
		currentFrame = this.animations[animation].frames[0];
		animationCount = 0;
	};

	this.getCol = function() {
		return Math.floor(currentFrame % framesPerRow);
	};

	this.getRow = function() {
		return Math.floor(currentFrame / framesPerRow);
	};
};