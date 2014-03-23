var DisplayObject = function()
{
	EventDispatcher.call(this);

	this.x = 0;
	this.y = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.rotation = 0;
	this.opacity = 1;
	this.visible = true;
}