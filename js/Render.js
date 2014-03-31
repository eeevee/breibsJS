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
					//if TextField, the render uses the align property (left, center, etc) to rotate
					if (displayObject instanceof TextField) {
						displayObject.rotationPoint.x = 0;
						displayObject.rotationPoint.y = 0;
					}
					var centerX = displayObject.x + displayObject.rotationPoint.x;
					var centerY = displayObject.y + displayObject.rotationPoint.y;
					this.context.translate(centerX, centerY);
					var rotationInRadians = displayObject.rotation * Math.PI / 180;
					this.context.rotate(rotationInRadians);
					this.context.translate(-centerX, -centerY);
					if (displayObject instanceof TextField) {
						this.context.font = displayObject.getFont();
						this.context.textAlign = displayObject.textAlign;
						this.context.fillStyle = displayObject.fontColor;
						var measure = this.context.measureText(displayObject.text);
						displayObject.width = measure.width;
						displayObject.height = measure.height;
						this.context.fillText(displayObject.text, displayObject.x, displayObject.y);
					} else {
						this.context.drawImage(displayObject.image, displayObject.x, displayObject.y, displayObject.width, displayObject.height);
					}
					this.context.globalAlpha = 1;
					this.context.restore();
				}
			}
		}
	}
}