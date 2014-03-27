var TweenGroup = function(target)
{
	EventDispatcher.call(this);

	this.tweens = [];
	this.target = target;

	this.moveTo = function(x, y, frames, ease) {
		var tween = new Tween();
		tween.moveTo(this.target, x, y, frames, ease);
		tween.addEventListener('complete', this.completeTweenHandler.bind(this));
		if (this.tweens.length == 0) tween.start();
		this.tweens.push(tween);
		return this;
	};

	this.completeTweenHandler = function(e) {
		var tweenIndex = this.tweens.indexOf(e.target);
		this.tweens.splice(tweenIndex, 1);
		if (this.tweens.length == 0) {
			this.dispatchEvent('complete');
		} else {
			this.updateNextTweenPositionAndStartThen();
			this.dispatchEvent('tween_completed');
		}
	};

	this.updateNextTweenPositionAndStartThen = function() {
		var tween = this.tweens[0];
		tween.properties['x'].startPos = this.target.x;
		tween.properties['y'].startPos = this.target.y;
		tween.start();	
	};
};