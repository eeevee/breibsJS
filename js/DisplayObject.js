var DisplayObject = function(width, height)
{
	EventDispatcher.call(this);

	this._originalWidth = width;
	this._originalHeight = height;

	this.x = 0;
	this.y = 0;
	this.rotation = 0;
	this.opacity = 1;
	this.visible = true;
	this.width = width;
	this.height = height;

	//GETTERS
	this.getScaleX = function() {
		return this.width / this._originalWidth;
	};

	this.getScaleY = function() {
		return this.height / this._originalHeight;
	};

	//SETTERS
	this.setScaleX = function(value) {
		this.width = this._originalWidth * value;
	};

	this.setScaleY = function(value) {
		this.height = this._originalHeight * value;
	};
}