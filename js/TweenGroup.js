var TweenGroup = function(target)
{
	EventDispatcher.call(this);

	this.tweens = [];
	this.target = target;

	this.moveTo = function(x, y, frames, ease) {
		var tween = new Tween(this.target);
		tween.moveTo(x, y, frames, ease);
		this.addTween(tween);
		return this;
	};

	this.scaleTo = function(scaleX, scaleY, frames, ease) {
		var tween = new Tween(this.target);
		tween.scaleTo(scaleX, scaleY, frames, ease);
		this.addTween(tween);
		return this;
	};

	this.to = function(frames, properties) {
		var tween = new Tween(this.target);
		tween.to(frames, properties);
		this.addTween(tween);
	};

	this.addTween = function(tween) {
		tween.addEventListener('complete', this.completeTweenHandler.bind(this));
		if (this.tweens.length == 0) tween.start();
		this.tweens.push(tween);
	};

	this.completeTweenHandler = function(e) {
		var tweenIndex = this.tweens.indexOf(e.target);
		this.tweens.splice(tweenIndex, 1);
		if (this.tweens.length == 0) {
			this.dispatchEvent('complete');
		} else {
			this.updateNextTweenPropertiesAndStartThen();
			this.dispatchEvent('tween_completed');
		}
	};

	this.updateNextTweenPropertiesAndStartThen = function() {
		var tween = this.tweens[0];
		for (var key in tween.properties) {
			tween.properties[key].startPos = this.target[key];
		}
		tween.start();	
	};
};