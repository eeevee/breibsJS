var Sprite = function(width, height) 
{
	DisplayObject.call(this, width, height);

	var _collisionManager = new CollisionManager(this);
	this.tweenGroup = new TweenGroup(this);
	this.image;

	this.boxCollides = function(target, pixel) {
		return _collisionManager.boxCollides(target, pixel);
	};

	this.pointCollides = function(point) {
		return _collisionManager.pointCollides(point);
	};

	this.pixelPerfectCollides = function(target) {
		return _collisionManager.pixelPerfectCollides(target);
	};
};
