var Render = function(context)
{
	this.context = context;
	this.canRender = true;

	this.clear = function() {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	}

	this.drawScene = function(scene) {
		if (this.canRender) {
			this.clear();
			if (!scene) return;
			for (var i = 0; i < scene.childs.length; i++) {
				var displayObject = scene.childs[i];
				if (displayObject.visible) {
					this.context.save();
					this.context.globalAlpha = displayObject.opacity;
					var rotationInRadians = displayObject.rotation * Math.PI / 180;
					context.rotate(rotationInRadians);
					this.context.drawImage(displayObject.image, displayObject.x, displayObject.y, displayObject.width, displayObject.height);
					this.context.globalAlpha = 1;
					this.context.restore();
				}
			}
		}
	}
}