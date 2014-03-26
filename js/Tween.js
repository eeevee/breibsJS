/************************************************************************************/
/* Explain Ease - http://upshots.org/actionscript/jsas-understanding-easing			*/
/* Equations - https://github.com/danro/jquery-easing/blob/master/jquery.easing.js 	*/
/************************************************************************************/

var Tween = function()
{
	EventDispatcher.call(this);

	this.target;
	this.properties = {};
	this.interval;
	this.steps;

	this.moveTo = function(target, x, y, frames) {
		this.target = target;
		this.properties['x'] = {startPos: target.x, endPos: x};
		this.properties['y'] = {startPos: target.y, endPos: y};
		this.steps = frames;
	};

	this.start = function() {
		for (var key in this.properties) {
			this.properties[key].values = this.calculateValues(this.properties[key]);
			this.properties[key].index = 0;
			this.properties[key].finished = false;
		}
		this.playInterval();
	};

	this.playInterval = function() {
		this.interval = setTimeout(this.loop.bind(this), 1000 / GAME_FPS);
	};

	this.loop = function() {
		for (var key in this.properties) {
			if (!this.properties[key].finished) {
				if (this.properties[key].index == this.steps + 1) {
					this.properties[key].finished = true;
				} else {
					this.target[key] = this.properties[key].values[this.properties[key].index];
					this.properties[key].index += 1;
				}
			}
		}

		var finishedTween = true;
		for (var key in this.properties) {
			if (!this.properties[key].finished) {
				finishedTween = false;
				break;
			}
		}

		if (!finishedTween) {
			this.playInterval();
		}
	};

	this.calculateValues = function(properties) {
		var values = [];
		for (var i = 0; i < this.steps + 1; i++) {
			var startValue = properties.startPos;
			var currentTime = i + 1;
			var duration = this.steps;
			var changeInValue = ((properties.endPos - properties.startPos) );
			//values.push((changeInValue * (currentTime / duration)) + startValue);//linear
			//values.push((changeInValue * (currentTime /= duration) * currentTime) + startValue);//easeInQuad
			values.push(-changeInValue * (currentTime /= duration) * (currentTime - 2) + startValue);//easeOutQuad
		}
		return values;
	};
};