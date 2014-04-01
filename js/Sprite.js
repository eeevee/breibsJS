var Sprite = function(width, height) 
{
	DisplayObject.call(this, width, height);

	this.tweenGroup = new TweenGroup(this);
	this.image;
};
