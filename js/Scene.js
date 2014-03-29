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
		if (this.getChildIndex(displayObject) == -1) {
			this.childs.push(displayObject);
		}
	};

	this.setChildIndex = function(displayObject, index) {
		if (index >= this.childs.length) throw new Error('Index out of bounds');
		var objIndex = this.childs.indexOf(displayObject);
		if (objIndex == -1) throw new SceneException('Child not found');
		this.childs.splice(objIndex, 1);
		this.childs.splice(index, 0, displayObject);
	};

	this.getChildIndex = function(displayObject) {
		return this.childs.indexOf(displayObject);
	};

	this.getChildsUnderPoint = function(point) {
		var childsUnderPoint = [];
		for (var i = 0; i < this.childs.length; i++) {
			var child = this.childs[i];
			if (!child.visible) continue;
			if (child.pointCollides(point)) {
				childsUnderPoint.push(child);
			}
		}
		return childsUnderPoint;
	};
}