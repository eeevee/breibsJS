var Scene = function(name) 
{
	EventDispatcher.call(this);

	this.childs = [];
	this.backgroundMap = null;
	this.foregroundMap = null;
	this.name = name;
	this.context = null;
	//dar suporte a um mapa de background e um mapa de foreground
	
	this.addChild = function(displayObject) {
		this.childs.push(displayObject);
	};
}