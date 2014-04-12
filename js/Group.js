var Group = function()
{
	Sprite.call(this, 0, 0, null);

	this.childs = [];

	this.add = function(displayObject) {
		if (this.childs.indexOf(displayObject) == -1) {
			this.childs.push(displayObject);	
		}
	};

	this.remove = function(displayObject) {
		var index = this.childs.indexOf(displayObject); 
		if (index > -1) {
			this.childs.splice(index, 1);	
		}
	};
};