var Surface = function(width, height, addToDocument) 
{
	if (addToDocument == null) {
		addToDocument = true;
	}

	this.canvas = document.createElement('canvas');
	this.canvas.width = width;
	this.canvas.height = height;
	this.canvas.style.border = "1px solid";
	if (addToDocument) document.body.appendChild(this.canvas);

	this.context = this.canvas.getContext('2d');
};