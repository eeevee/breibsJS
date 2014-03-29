/************************************************************************************/
/* Explain Ease - http://upshots.org/actionscript/jsas-understanding-easing			*/
/* Equations - https://github.com/danro/jquery-easing/blob/master/jquery.easing.js 	*/
/************************************************************************************/

var Tween = function(target)
{
	EventDispatcher.call(this);

	this.target = target;
	this.properties = {};
	this.interval;
	this.steps;
	this.running = false;

	this.moveTo = function(x, y, frames, ease) {
		if (ease == null) {
			ease = Ease.linear;
		}
		this.properties['x'] = {startPos: this.target.x, endPos: x, ease: ease};
		this.properties['y'] = {startPos: this.target.y, endPos: y, ease: ease};
		this.steps = frames;
	};

	this.scaleTo = function(scaleX, scaleY, frames, ease) {
		if (ease == null) {
			ease = Ease.linear;
		}
		this.properties['width'] = {startPos: this.target.width, endPos: this.target.width * scaleX, ease: ease};
		this.properties['height'] = {startPos: this.target.height, endPos: this.target.height * scaleY, ease: ease};
		this.steps = frames;
	};

	this.to = function(frames, properties) {
		this.steps = frames;

		var ease = null;
		if (properties['ease']) {
			ease = properties['ease'];
		} else {
			ease = Ease.linear;
		}
		
		for (var key in properties) {
			if (key == 'scaleX') {
				this.properties['width'] = {startPos: this.target['width'], endPos: this.target['width'] * properties[key], ease: ease};
			} else if (key == 'scaleY') {
				this.properties['height'] = {startPos: this.target['height'], endPos: this.target['height'] * properties[key], ease: ease};
			} else if (key != 'ease') {
				this.properties[key] = {startPos: this.target[key], endPos: properties[key], ease: ease};
			}
		}
	};

	this.start = function() {
		for (var key in this.properties) {
			this.properties[key].values = this.calculateValues(this.properties[key]);
			this.properties[key].index = 0;
			this.properties[key].finished = false;
		}
		this.playInterval();
		this.running = true;
	};

	this.playInterval = function() {
		this.interval = setTimeout(this.loop.bind(this), 1000 / GAME_FPS);
	};

	this.loop = function() {
		for (var key in this.properties) {
			if (!this.properties[key].finished) {
				if (this.properties[key].index == this.steps) {
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
		} else {
			this.running = false;
			this.dispatchEvent('complete');
		}
	};

	this.calculateValues = function(properties) {
		var values = [];
		for (var i = 0; i < this.steps; i++) {
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

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */