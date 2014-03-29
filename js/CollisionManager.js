var CollisionManager = function(source)
{
	var _source = source;
	var _collisionSurfaceSource = new Surface((surface) ? surface.canvas.width : 100, (surface) ? surface.canvas.height : 100, DEBUG);
	var _collisionSurfaceTarget = new Surface((surface) ? surface.canvas.width : 100, (surface) ? surface.canvas.height : 100, DEBUG);
	var _renderSource = new Render(_collisionSurfaceSource.context);
	var _renderTarget = new Render(_collisionSurfaceTarget.context);
	var _collisionSceneSource = new Scene('collisionSource');
	var _collisionSceneTarget = new Scene('collisionTarget');
	_collisionSceneSource.addChild(source);

	this.boxCollides = function(target, pixel) {
		if (!target.visible) return false;
		if (_source.x < target.x + target.width  &&
			_source.x + _source.width > target.x    &&
			_source.y < target.y + target.height &&
			_source.y + _source.height > target.y) {
				if (!pixel) {
					return true;
				} else {
					return this.pixelPerfectCollides(target);
				}
				
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
		_collisionSceneTarget.addChild(target);
		_renderSource.drawScene(_collisionSceneSource);
		_renderTarget.drawScene(_collisionSceneTarget);

		var intersection = calculateIntersection(_source, target);
		if (!intersection) return;
		var sourceImageData = _collisionSurfaceSource.context.getImageData(intersection.x, intersection.y, intersection.width, intersection.height);
		var targetImageData = _collisionSurfaceTarget.context.getImageData(intersection.x, intersection.y, intersection.width, intersection.height);

		for (var i = 0; i < sourceImageData.data.length; i += 4) {
			var pixel1 = sourceImageData.data[i + 3];
			var pixel2 = targetImageData.data[i + 3];
			if (pixel1 != 0 && pixel2 != 0) {
				return true;
			}
		}
		return false;
	};

	var calculateIntersection = function(rect1, rect2) {
	    var dx;
	    var dy;
	    var r1 = {};
	    var r2 = {};
	    r1.centerX = rect1.x + (r1.halfWidth = (rect1.width / 2));
	    r1.centerY = rect1.y + (r1.halfHeight = (rect1.height/ 2));
	    r2.centerX = rect2.x + (r2.halfWidth = (rect2.width / 2));
	    r2.centerY = rect2.y + (r2.halfHeight = (rect2.height/ 2));

	    dx = Math.abs(r1.centerX-r2.centerX) - (r1.halfWidth + r2.halfWidth);
	    dy = Math.abs(r1.centerY-r2.centerY) - (r1.halfHeight + r2.halfHeight);

	    if (dx < 0 && dy < 0) {
	      dx = Math.min(Math.min(rect1.width, rect2.width), -dx);
	      dy = Math.min(Math.min(rect1.height, rect2.height), -dy);
	      return {x:Math.max(rect1.x, rect2.x),
	              y:Math.max(rect1.y, rect2.y),
	              width: dx,
	              height: dy};
	    } else {
	      return null;
	    }
  	}
};