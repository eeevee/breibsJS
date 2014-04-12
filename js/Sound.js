var Sound = function(audio) 
{
	this.audio = audio;
	this.currentTime = 0;

	this.play = function() {
		this.audio.currentTime = this.currentTime;
		this.audio.play();
	};

	this.stop = function() {
		this.currentTime = 0;
		this.audio.stop();
	};

	this.pause = function() {
		this.currentTime = audio.currentTime;
		this.stop();
	};
};