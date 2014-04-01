var Sprite = function(width, height, image) 
{
	DisplayObject.call(this, width, height);

	this.tweenGroup = new TweenGroup(this);
	this.image = image;
};
