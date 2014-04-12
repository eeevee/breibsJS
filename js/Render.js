var Render = function(context)
{
	this.context = context;
	this.canRender = true;

	this.clear = function() {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	};

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
					this.renderByType(displayObject);
					this.context.globalAlpha = 1;
					this.context.restore();
				}
			}
		}
	};

	this.renderByType = function(displayObject, group) {
		if (displayObject instanceof TextField) {
			this.renderTextField(displayObject, group);
		} else if(displayObject instanceof SpriteSheet) {
			this.renderSpriteSheet(displayObject, group);
		} else if (displayObject instanceof Group) {
			for (var j = 0; j < displayObject.childs.length; j++) {
				var child = displayObject.childs[j];
				this.renderByType(child, displayObject);
			}
		} else {
			this.renderSprite(displayObject, group);
		}
	};

	this.renderTextField = function(textField, group) {
		var x = textField.x;
		var y = textField.y;
		if (group) {
			x += group.x;
			y += group.y;
		}
		this.context.font = textField.getFont();
		this.context.textAlign = textField.textAlign;
		this.context.fillStyle = textField.fontColor;
		var measure = this.context.measureText(textField.text);
		textField.width = measure.width;
		textField.height = measure.height;
		this.context.fillText(textField.text, x, y);
	};

	this.renderSpriteSheet = function(spriteSheet, group) {
		var x = spriteSheet.x;
		var y = spriteSheet.y;
		if (group) {
			x += group.x;
			y += group.y;
		}
		this.context.drawImage(spriteSheet.image, spriteSheet.getCol() * spriteSheet.width, 
			spriteSheet.getRow() * spriteSheet.height, spriteSheet.width, spriteSheet.height, x, y,
			 spriteSheet.width, spriteSheet.height);
		spriteSheet.update();
	};

	this.renderSprite = function(sprite, group) {
		var x = sprite.x;
		var y = sprite.y;
		if (group) {
			x += group.x;
			y += group.y;
		}
		this.context.drawImage(sprite.image, x, y, sprite.width, sprite.height);
	};
}