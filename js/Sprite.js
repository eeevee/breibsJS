var Sprite = function(width, height) 
{
	DisplayObject.call(this);

	var _width = width;
	var _height = height;
	this.tweenGroup = new TweenGroup(this);
	this.image;
	this.collisionSurface = new Surface(surface.canvas.width, surface.canvas.height, true);
	this.collisionScene = new Scene('collision');
	this.render = new Render(this.collisionSurface.context);

	this.boxCollides = function(target) {
		if (!target.visible) return false;
		if (this.x < target.x + target.width  &&
			this.x + this.getWidth() > target.x    &&
			this.y < target.y + target.height &&
			this.y + this.getHeight() > target.y) {
				return true;
		}
		return false;
	};

	this.pointCollides = function(point) {
		if (this.x < point.x && this.x + this.getWidth() > point.x &&
			this.y < point.y && this.y + this.getHeight() > point.y) {
			return true;
		}
		return false;
	};

	this.pixelPerfectCollides = function(target) {
		this.collisionScene.addChild(this);
		this.collisionScene.addChild(target);
		this.render.drawScene(this.collisionScene);
		//var myImageData = this.generatePixelMap(this);//surface.context.getImageData(this.x, this.y, this.getWidth(), this.getHeight());
		//var myImageData = surface.context.getImageData(this.x, this.y, this.getWidth(), this.getHeight());
		//var targetImageData = surface.context.getImageData(targetImageData.x, targetImageData.y, targetImageData.getWidth(), targetImageData.getHeight());
		//var targetImageData = this.generatePixelMap(target);//surface.context.getImageData(targetImageData.x, targetImageData.y, targetImageData.getWidth(), targetImageData.getHeight());

		var left = Math.max(this.x, target.x);
		var top = Math.max(this.y, target.y);
		var right = Math.max(this.x + this.getWidth(), target.x + target.getWidth());
		var bottom = Math.max(this.y + this.getHeight(), target.y + target.getHeight());

		//to ensure that the top-left corner is both above and to the left of the bottom-right corner
		//if (xMin >= xMax || yMin >= yMax) return false;

		//var xDiff = xMax - xMin;
		//var yDiff = yMax - yMin;
		//var myPixels = myImageData.data;
		//var targetPixels = targetImageData.data;

/*
		for (var y = top; y < bottom; y++) {
			for (var x = left; x < right; x++) {
				var pixel1 = myImageData[(x - this.x) + "_" + (y - this.y)];
				var pixel2 = targetImageData[(x - target.x) + "_" + (y - target.y)];

				if (!pixel1 || ! pixel2) {
					continue;
				}

				if (pixel1.pixelData[3] != 0 && pixel2.pixelData[3] != 0) {
					return true;
				}
			}
		}
*/
		return false;
	};

	this.generatePixelMap = function(source, resolution) {
		if (!resolution) resolution = 5;
		if (!source) source = this;
		
		var map = [];
		for (var y = 0; y < source.height; y += resolution) {
			for (var x = 0; x < source.width; x += resolution) {
				var rowOffset = y + "_" + x;
				var pixel = surface.context.getImageData(x, y, resolution, resolution);
				var pixelData = pixel.data;
				map[rowOffset] = {x: x, y: y, pixelData: pixelData};
			}
		}
		return map;
	};

	//GETTERS
	this.getWidth = function() {
		return _width * this.scaleX;
	};

	this.getHeight = function() {
		return _height * this.scaleY;
	};

	//SETTERS
	this.setWidth = function(value) {
		_width = value;
	};

	this.setHeight = function(value) {
		_height = value;
	};
};
