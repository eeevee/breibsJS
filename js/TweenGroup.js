var TweenGroup = function(target)
{
	EventDispatcher.call(this);

	this.tweens = [];
	this.target = target;

	this.moveTo = function(x, y, frames, ease) {
		var tween = new Tween();
		tween.moveTo(this.target, x, y, frames, ease);
		tween.addEventListener('complete', this.removeTween.bind(this));
		tween.start();
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
};