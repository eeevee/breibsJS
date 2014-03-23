var Core = function(gameWidth, gameHeight, gameFPS)
{
	EventDispatcher.call(this);

	//PRIVATE VARS
	var scenes = [];

	//PUBLIC VARS
	this.preloadAssetsQueue = [];
	this.assets = {};
	this.rootScene;
	this.currentScene;
	this.canvas;
	this.gameWidth = gameWidth;
	this.gameHeight = gameHeight;
	this.gameFPS = gameFPS;
	this.render;
	this.keyboard;

	//PRIVATE FUNCTIONS
	var getAssetType = function(pathToAsset) {

	};

	//PRIVILEGED FUNCTIONS
	this.init = function() {
		this.rootScene = new Scene('root');
		this.currentScene = this.rootScene;
		this.addScene(this.rootScene);
		this.canvas = new Surface(this.gameWidth, this.gameHeight);
		this.render = new Render(this.canvas.context);
		this.keyboard = new Keyboard();
		this.interval = setTimeout(this.tick.bind(this), 1000 / this.gameFPS);

		window.addEventListener('keydown', this.keyboardHandler.bind(this), false);
		window.addEventListener('keyup', this.keyboardHandler.bind(this), false);
	};
	
	this.preloadAsset = function(pathToAsset) {
		var img = new Image();
		img.src = pathToAsset;
		img.id = pathToAsset;
		this.preloadAssetsQueue.push(img);
		img.addEventListener('load', this.imageLoadHandler.bind(this));
	};

	this.imageLoadHandler = function(e) {
		this.assets[e.srcElement.id] = e.srcElement;
		this.removeFromPreloadQueue(e.srcElement);
		if (this.preloadAssetsQueue.length == 0) {
			this.dispatchEvent(new Event('load'));
		}
	};

	this.removeFromPreloadQueue = function(el) {
		for (var i = 0; i < this.preloadAssetsQueue.length; i++) {
			if (el === this.preloadAssetsQueue[i]) {
				this.preloadAssetsQueue.splice(i, 1);
				break;
			}
		}
	};

	this.loadAsset = function(pathToAsset) {
		//get the asset type and start load
		//add to list event the asset not finish load
	};

	this.addScene = function(scene) {
		scenes.push(scene);
	};

	this.getScene = function(sceneName) {
		for (var i = 0; i < scenes.length; i++) {
			if (scenes[i].name === sceneName) return scenes[i];
		}

		return null;
	};

	this.changeScene = function(sceneName) {
		this.currentScene = this.getScene(sceneName);
		if (this.currentScene === null) {
			throw new CoreException('Scene not found');
		}
	};

	this.tick = function() {
		this.render.drawScene(this.currentScene);
		this.interval = setTimeout(this.tick.bind(this), 1000 / this.gameFPS);
		this.dispatchEvent(new Event('enterframe'));
	};

	this.keyboardHandler = function(e) {
		this.dispatchEvent(e);
	};
}