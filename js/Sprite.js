var Sprite = function(width, height) 
{
	DisplayObject.call(this);

	this.width = width;
	this.height = height;
	this.tweenGroup = new TweenGroup(this);
	this.image;

	this.boxCollides = function(target) {
		if (!target.visible) return false;
		if (this.x < target.x + target.width  &&
			this.x + this.getWidth() > target.x    &&
			this.y < target.y + target.height &&
			this.y + this.getHeight() > target.y) {
				return true;
		}
		return false;
	};

	this.pointCollides = function(point) {
		if (this.x < point.x && this.x + this.getWidth() > point.x &&
			this.y < point.y && this.y + this.getHeight() > point.y) {
			return true;
		}
		return false;
	};

	this.getWidth = function() {
		return this.width * this.scaleX;
	};

	this.getHeight = function() {
		return this.height * this.scaleY;
	};
};
