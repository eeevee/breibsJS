var TweenGroup = function()
{
	this.tweens = [];

	this.addTween = function(tween) {
		tween.addEventListener('complete', this.removeTween.bind(this));
		this.tweens.push(tween);
	};

	this.removeTween = function(e) {
		var tweenIndex = this.tweens.indexOf(tween);
		this.tweens.splice(tweenIndex, 1);
	};
}