var TweenGroup = function()
{
	EventDispatcher.call(this);

	this.tweens = [];

	this.addTween = function(tween) {
		tween.addEventListener('complete', this.removeTween.bind(this));
		this.tweens.push(tween);
		return this;
	};

	this.removeTween = function(e) {
		var tweenIndex = this.tweens.indexOf(tween);
		this.tweens.splice(tweenIndex, 1);
		if (this.tweens.length == 0) {
			this.dispatchEvent('complete');
		}
	};
}