var Scene = function(name) 
{
	EventDispatcher.call(this);

	var childs = [];

	this.backgroundMap = null;
	this.foregroundMap = null;
	this.name = name;
	//dar suporte a um mapa de background e um mapa de foreground
	
	this.addChild = function(displayObject) {

	};
}