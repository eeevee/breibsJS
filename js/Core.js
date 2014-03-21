var Core = function(gameWidth, gameHeight, gameFPS)
{
	EventDispatcher.call(this);

	//PRIVATE VARS
	var scenes = [];

	//PUBLIC VARS
	this.assets = {};
	this.rootScene;
	this.currentScene;
	this.canvas;
	this.gameWidth = gameWidth;
	this.gameHeight = gameHeight;
	this.gameFPS = gameFPS;
	this.render;

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
		this.interval = setTimeout(this.tick.bind(this), 1000 / this.gameFPS);
	};
	
	this.preloadAsset = function(pathToAsset) {
		var img = new Image();
		img.src = pathToAsset;
		img.id = pathToAsset;
		img.addEventListener('load', this.imageLoadHandler.bind(this));
	};

	this.imageLoadHandler = function(e) {
		this.assets[e.srcElement.id] = e.srcElement;
		this.dispatchEvent(new Event('load'));
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
	};
}