var GAME_FPS = 30;
var DEBUG = false;
var surface;
var core;

var Core = function(gameWidth, gameHeight, gameFPS)
{
	EventDispatcher.call(this);

	core = this;
	//GLOBAL VARS
	GAME_FPS = gameFPS;

	//PRIVATE VARS
	var scenes = [];

	//PUBLIC VARS
	this.preloadAssetsQueue = [];
	this.assets = {};
	this.rootScene;
	this.currentScene;
	this.gameWidth = gameWidth;
	this.gameHeight = gameHeight;
	this.render;
	this.keyboard;

	//PRIVILEGED FUNCTIONS
	this.init = function() {
		this.rootScene = new Scene('root');
		this.currentScene = this.rootScene;
		this.addScene(this.rootScene);
		surface = new Surface(this.gameWidth, this.gameHeight);
		this.render = new Render(surface.context);
		this.keyboard = new Keyboard();
		this.interval = setTimeout(this.tick.bind(this), 1000 / GAME_FPS);

		window.addEventListener('keydown', this.keyboardHandler.bind(this), false);
		window.addEventListener('keyup', this.keyboardHandler.bind(this), false);
		surface.canvas.addEventListener('mousedown', this.mouseDownHandler.bind(this), true);
		surface.canvas.addEventListener('touchstart', touchStartHandler.bind(this), false);
		surface.canvas.addEventListener('touchend', touchEndHandler.bind(this), false);
	};
	
	this.preloadAsset = function(pathToAsset) {
		var extension = pathToAsset.split('.');
		extension = extension[extension.length - 1];
		if (extension == 'mp3' || extension == 'ogg' || extension == 'wav') {
			this.loadAudio(pathToAsset);
		} else {
			this.loadImage(pathToAsset);
		}
	};

	this.loadAudio = function(pathToAsset) {
		var el = new Audio();
		el.id = pathToAsset;
		el.src = pathToAsset;
		el.addEventListener('loadeddata', this.assetLoadHandlerBind);
		this.preloadAssetsQueue.push(el);
	};

	this.loadImage = function(pathToAsset) {
		var el = new Image();
		el.id = pathToAsset;
		el.src = pathToAsset;
		el.addEventListener('load', this.assetLoadHandlerBind);
		this.preloadAssetsQueue.push(el);
	};

	this.assetLoadHandler = function(e) {
		var el = e.srcElement || e.target;
		this.assets[el.id] = el;
		this.removeFromPreloadQueue(el);
		if (this.preloadAssetsQueue.length == 0) {
			this.dispatchEvent(new Event('assetsloaded'));
		}
	};

	this.assetLoadHandlerBind = this.assetLoadHandler.bind(this);

	this.removeFromPreloadQueue = function(el) {
		for (var i = 0; i < this.preloadAssetsQueue.length; i++) {
			if (el === this.preloadAssetsQueue[i]) {
				this.preloadAssetsQueue.splice(i, 1);
				break;
			}
		}
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

	this.removeScene = function(sceneName) {
		delete this.scenes[sceneName];
	};

	this.tick = function() {
		this.render.drawScene(this.currentScene);
		this.interval = setTimeout(this.tick.bind(this), 1000 / GAME_FPS);
		var e = new Event('enterframe');
		this.dispatchEvent(e);
		this.currentScene.dispatchEvent(e);
	};

	//USER INPUTS
	this.keyboardHandler = function(e) {
		this.dispatchEvent(e);
	};

	this.mouseDownHandler = function(e) {
		var spritesClicked = this.currentScene.getChildsUnderPoint({x: e.layerX, y: e.layerY});
		for (var i = 0; i < spritesClicked.length; i++) {
			spritesClicked[i].dispatchEvent(e);
		}
		this.dispatchEvent(e);
	};

	var touchStartHandler = function(e) {
		//e.preventDefault();
		for (var i = 0; i < e.changedTouches.length; i++) {
			surface.context.beginPath();
			surface.context.arc(e.changedTouches[i].pageX, e.changedTouches[i].pageY, 4, 0, 2* Math.PI, false);
			surface.context.fillStyle = Math.random() * 512;
			surface.context.fill();
		}
	};

	var touchEndHandler = function(e) {
		e.preventDefault();
		/*var txt = '';
		for (var i = 0; i < e.changedTouches.length; i++) {
			txt += '   ->X:' + e.changedTouches[i].pageX + '->Y:' + e.changedTouches[i].pageY + '     ';
		}
		alert(txt);*/
	};
}