var Sound = function(audio) 
{
	this.audio = audio;
	this.currentTime = 360;

	this.play = function(loop) {
		if (loop == null) {
			loop = false;
		}
		this.audio.currentTime = this.currentTime;
		this.audio.play();
		if (loop) {
			this.audio.addEventListener('ended', this.endSoundHandlerBind);
		}
	};

	this.stop = function() {
		this.currentTime = 0;
		this.audio.stop();
		this.audio.removeEventListener('ended', this.endSoundHandlerBind);
	};

	this.pause = function() {
		this.currentTime = audio.currentTime;
		this.stop();
	};

	var endSoundHandler = function(e) {
		this.currentTime = 0;
		this.play();
	};

	this.endSoundHandlerBind = endSoundHandler.bind(this);
};