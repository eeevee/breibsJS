var Sprite = function(width, height) 
{
	DisplayObject.call(this, width, height);

	var _originalWidth = width;
	var _originalHeight = height;
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

	//GETTERS
	this.getScaleX = function() {
		return this.width / _originalWidth;
	};

	this.getScaleY = function() {
		return this.height / _originalHeight;
	};

	//SETTERS
	this.setScaleX = function(value) {
		this.width = _originalWidth * value;
	};

	this.setScaleY = function(value) {
		this.height = _originalHeight * value;
	};
};
