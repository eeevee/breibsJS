var SpriteSheet = function(width, height, image, speed)
{
	Sprite.call(this, width, height, image);

	var currentFrame = 0;
	var animationCount = 0;
	var count = 0;
	var framesPerRow = Math.floor(image.width / this.width);
	var speed = speed;
	var stopped = true;

	this.animations = {};
	this.currentAnimation = '';

	this.update = function() {
		if (stopped) return;
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
		if (this.animations[animation].hasOwnProperty('speed')) {
			speed = this.animations[animation]['speed'];
		}
		stopped = false;
	};

	this.stop = function(stopFrame) {
		if (stopFrame == null) {
			if (this.currentAnimation.length) {
				currentFrame = this.animations[this.currentAnimation].frames[0];
			} else {
				currentFrame = 0;
			}
		} else {
			currentFrame = stopFrame;
		}

		stopped = true;
	};

	this.getCol = function() {
		return Math.floor(currentFrame % framesPerRow);
	};

	this.getRow = function() {
		return Math.floor(currentFrame / framesPerRow);
	};
};