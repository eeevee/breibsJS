var CollisionManager = function(source)
{
	var _source = source;
	var _collisionSurface = new Surface(surface.canvas.width, surface.canvas.height, true);
	var _collisionScene = new Scene('collision');
	var _render = new Render(_collisionSurface.context);
	
	_collisionScene.addChild(source);

	this.boxCollides = function(target) {
		if (!target.visible) return false;
		if (_source.x < target.x + target.getWidth()  &&
			_source.x + _source.getWidth() > target.x    &&
			_source.y < target.y + target.getHeight() &&
			_source.y + _source.getHeight() > target.y) {
				return true;
		}
		return false;
	};

	this.pointCollides = function(point) {
		if (_source.x < point.x && _source.x + _source.getWidth() > point.x &&
			_source.y < point.y && _source.y + _source.getHeight() > point.y) {
			return true;
		}
		return false;
	};

	this.pixelPerfectCollides = function(target) {
		_collisionScene.addChild(target);
		_render.drawScene(_collisionScene);
		//var myImageData = this.generatePixelMap(this);//surface.context.getImageData(this.x, this.y, this.getWidth(), this.getHeight());
		//var myImageData = surface.context.getImageData(this.x, this.y, this.getWidth(), this.getHeight());
		//var targetImageData = surface.context.getImageData(targetImageData.x, targetImageData.y, targetImageData.getWidth(), targetImageData.getHeight());
		//var targetImageData = this.generatePixelMap(target);//surface.context.getImageData(targetImageData.x, targetImageData.y, targetImageData.getWidth(), targetImageData.getHeight());

		var left = Math.max(_source.x, target.x);
		var top = Math.max(_source.y, target.y);
		var right = Math.max(_source.x + _source.getWidth(), target.x + target.getWidth());
		var bottom = Math.max(_source.y + _source.getHeight(), target.y + target.getHeight());

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
};