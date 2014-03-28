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
			this.x + this.width * this.scaleX > target.x    &&
			this.y < target.y + target.height &&
			this.y + this.height * this.scaleY > target.y) {
				return true;
		}
		return false;
	};

	this.pointCollides = function(point) {
		if (this.x < point.x && this.x + (this.width * this.scaleX) > point.x &&
			this.y < point.y && this.y + (this.height * this.scaleY) > point.y) {
			return true;
		}
		return false;
	};
};
