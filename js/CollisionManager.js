var CollisionManager = function(source)
{
	var _source = source;
	var _collisionSurface = new Surface((surface) ? surface.canvas.width : 100, (surface) ? surface.canvas.height : 100, true);
	var _render = new Render(_collisionSurface.context);
	var _collisionScene = new Scene('collision');
	_collisionScene.addChild(source);

	this.boxCollides = function(target) {
		if (!target.visible) return false;
		if (_source.x < target.x + target.width  &&
			_source.x + _source.width > target.x    &&
			_source.y < target.y + target.height &&
			_source.y + _source.height > target.y) {
				return true;
		}
		return false;
	};

	this.pointCollides = function(point) {
		if (_source.x < point.x && _source.x + _source.width > point.x &&
			_source.y < point.y && _source.y + _source.height > point.y) {
			return true;
		}
		return false;
	};

	this.pixelPerfectCollides = function(target) {
		_collisionScene.addChild(target);
		_render.drawScene(_collisionScene);
		//var myImageData = this.generatePixelMap(this);//surface.context.getImageData(this.x, this.y, this.width, this.height);
		//var myImageData = surface.context.getImageData(this.x, this.y, this.width, this.height);
		//var targetImageData = surface.context.getImageData(targetImageData.x, targetImageData.y, targetImageData.width, targetImageData.height);
		//var targetImageData = this.generatePixelMap(target);//surface.context.getImageData(targetImageData.x, targetImageData.y, targetImageData.width, targetImageData.height);

		var left = Math.max(_source.x, target.x);
		var top = Math.max(_source.y, target.y);
		var right = Math.max(_source.x + _source.width, target.x + target.width);
		var bottom = Math.max(_source.y + _source.height, target.y + target.height);

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