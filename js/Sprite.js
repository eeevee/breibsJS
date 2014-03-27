var Sprite = function(width, height) 
{
	DisplayObject.call(this);

	this.width = width;
	this.height = height;
	this.tweenGroup = new TweenGroup(this);

	this.image;
};