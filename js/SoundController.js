var SoundController = function()
{
	var bgChannel = null;
	var fxChannels = [];

	this.playBg = function(sound) {
		if (bgChannel != null) {
			bgChannel.stop();
		}
		bgChannel = sound;
		bgChannel.play(true);
	};
}