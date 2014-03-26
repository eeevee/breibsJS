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

	this.moveTo = function(target, x, y, frames, ease) {
		if (ease == null) {
			ease = Ease.linear;
		}
		this.target = target;
		this.properties['x'] = {startPos: target.x, endPos: x, ease: ease};
		this.properties['y'] = {startPos: target.y, endPos: y, ease: ease};
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
			var startValue = properties.startPos;//b
			var currentTime = i + 1;//t
			var duration = this.steps;//d
			var changeInValue = ((properties.endPos - properties.startPos) );//c
			values.push(properties.ease(currentTime, startValue, changeInValue, duration));
		}
		return values;
	};
};

var Ease = {
	linear: function(t, b, c, d) {
		return c * (t / d) + b;
	},

	easeInQuad: function(t, b, c, d) {
		return c * ( t/= d) * t + b;
	},

	easeOutQuad: function(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},

	easeInOutQuad: function(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},

	easeInElastic: function(t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;  
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (a < Math.abs(c)) { 
			a = c; 
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin (c / a);
		}
		return -(a * Math.pow(2,10 * (t-= 1)) * Math.sin( (t * d - s) * (2 * Math.PI) / p )) + b;
	},

	easeOutElastic: function(t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * .3;
		if (a < Math.abs(c)) { 
			a = c; 
			var s = p / 4; 
		} else {
			var s = p / (2 * Math.PI) * Math.asin (c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin( (t * d - s) * (2 * Math.PI) / p ) + c + b;
	},

	easeInOutElastic: function(t, b, c, d) {
		var s = 1.70158;
		var p = 0;
		var a = c;
		if (t == 0) return b;
		if ((t /= d / 2) == 2) return b + c;
		if (!p) p = d * (.3 * 1.5);
		if (a < Math.abs(c)) { 
			a = c;
			var s = p / 4; 
		} else {
			var s = p / (2 * Math.PI) * Math.asin (c / a);
		}
		if (t < 1) return -.5 * (a * Math.pow(2,10 * (t -= 1)) * Math.sin( (t * d - s) * (2 * Math.PI) / p )) + b;
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin( (t * d - s) * (2 * Math.PI)/p ) * .5 + c + b;
	}
};