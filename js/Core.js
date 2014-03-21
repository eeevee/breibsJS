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
	};
	
	this.preloadAsset = function(pathToAsset) {
		//get the asset type and start load
		//dispatch event when load finished, adn add to the assets list
		assets.push(pathToAsset);
	};

	this.loadAsset = function(pathToAsset) {
		//get the asset type and start load
		//add to list event the asset not finish load
		assets.push(pathToAsset);
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

	//start
	this.init();
}