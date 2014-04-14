var SoundController = function()
{
	var bgChannel = null;
	var fxChannels = [];

	this.playBg = function(sound) {
		bgChannel = sound;
		bgChannel.play(true);
	};
}