//Actors
var Wizard = function(width, height, image)
{
	Sprite.call(this, width, height, image);

	this.lives = 3;
};

var Knife = function(width, height, image)
{
	Sprite.call(this, width, height, image);

	this.velocity = 6;
};

//Scenes
var TitleScene = function(name)
{
	Scene.call(this, name);

	var titleLabel = new TextField('Space Invaders Demo', 'Arial', 20, 'black', 'center');
	titleLabel.x = core.gameWidth / 2;
	titleLabel.y = core.gameHeight / 2;
	var pressLabel = new TextField('Press SPACE to start', 'Arial', 14, 'black', 'center');
	pressLabel.x = titleLabel.x;
	pressLabel.y = titleLabel.y + 30;

	this.addChild(titleLabel);
	this.addChild(pressLabel);

	this.keydownHandler = function(e) {
		if (e.keyCode == Keyboard.KEY_CODES['Space']) {
			Keyboard.pressedKeys[Keyboard.KEY_CODES['Space']] = false;
			core.removeEventListener('keydown', this.keydownHandlerBind);
			var evt = new Event('changescene');
			evt.data = 'game';
			core.dispatchEvent(evt);
		}
	};

	this.keydownHandlerBind = this.keydownHandler.bind(this);

	core.addEventListener('keydown', this.keydownHandlerBind);
};

var GameScene = function(name)
{
	Scene.call(this, name);

	var hero = new Wizard(16, 16,  core.assets['./img/wizard_evil_no_bg.png']);
	var enemies = [];
	var scoreLabel = new TextField('score: 0', 'Arial', 12, 'black', 'left');
	var score;
	var bullets = [];

	this.init = function() {
		while (this.childs.length) {
			this.removeChildAt(0);
		}

		score = 0;
		scoreLabel.text = 'score: ' + score;
		scoreLabel.x = 10;
		scoreLabel.y = 20;
		this.addChild(scoreLabel);
		enemies = [];
		bullets = [];

		hero.x = core.gameWidth / 2 - hero.width / 2;
		hero.y = core.gameHeight - hero.height;
		this.addChild(hero);

		for (var x = 0; x < 8; x++) {
			for (var y = 0; y < 3; y++) {
				var enemy = new Sprite(16,16);
				enemy.image = core.assets['./img/wizard_evil_no_bg.png'];
				enemy.x = 18 * x + 80;
				enemy.y = 18 * y + 10
				this.addChild(enemy);
				enemy.tweenGroup.moveTo(enemy.x + 50, enemy.y, 30).moveTo(enemy.x - 50, enemy.y, 30).setLoop(true);
				enemies.push(enemy);
			}
		}
	};

	this.frameHandler = function _frameHandler(e) {
		if(Keyboard.pressedKeys[Keyboard.KEY_CODES['Right']]) {
			if (hero.x < surface.canvas.width - hero.width) {
				hero.x += 5;
			}
		}

		if(Keyboard.pressedKeys[Keyboard.KEY_CODES['Left']]) {
			if (hero.x > 0) {
				hero.x -= 5;
			}
		}

		if(Keyboard.pressedKeys[Keyboard.KEY_CODES['Space']]) {
			if (bullets.length < 1) {
				var knife = new Knife(16, 16,  core.assets['./img/knife.png']);
				knife.x = hero.x + hero.width / 2;
				knife.y = hero.y - 5;
				this.addChild(knife);
				bullets.push(knife);
			}
		}

		//collision checks
		for (var i = 0; i < bullets.length; i++) {
			var bullet = bullets[i];
			//bullet out of screen
			if (bullet.y < -10) {
				this.removeChildAt(this.childs.indexOf(bullet));
				bullets.splice(bullets.indexOf(bullet), 1);
				continue;
			}
			bullet.y -= bullet.velocity;
			for (var j = 0; j < enemies.length; j++) {
				var wiz2 = enemies[j];
				//bullet collide with enemy
				if (bullet.boxCollides(wiz2, false)) {
  				enemies.splice(enemies.indexOf(wiz2), 1);
  				this.removeChildAt(this.childs.indexOf(wiz2));
  				bullets.splice(bullets.indexOf(bullet), 1);
  				this.removeChildAt(this.childs.indexOf(bullet));
  				score += 1;
  				scoreLabel.text = 'score: ' + score;
  				// all enemies destroyed, end game screen		
  				console.log(score);		
  				if (score == 24) {
  					this.removeEventListener('enterframe', _frameHandler);
  					var evt = new Event('changescene');
					evt.data = 'score';
					evt.score = score;
					core.dispatchEvent(evt);
  				}
  				break;
				}
			}
		}
	};

	this.init();
	this.addEventListener('enterframe', this.frameHandler.bind(this));
};

var ScoreScene = function(name, score)
{
	Scene.call(this, name);

	var scoreLabel = new TextField('score: ' + score, 'Arial', 30, 'black', 'center');
	scoreLabel.x = core.gameWidth / 2;
	scoreLabel.y = core.gameHeight / 2;
  	this.addChild(scoreLabel);

  	this.setLabel = function(label) {
  		scoreLabel.text = label;
  	};
  			
  	this.keydownHandler = function(e) {
		if (e.keyCode == Keyboard.KEY_CODES['Space']) {
			Keyboard.pressedKeys[Keyboard.KEY_CODES['Space']] = false;
			core.removeEventListener('keydown', this.keydownHandlerBind);
			var evt = new Event('changescene');
			evt.data = 'game';
			core.dispatchEvent(evt);
		}
	};

	this.keydownHandlerBind = this.keydownHandler.bind(this);

	core.addEventListener('keydown', this.keydownHandlerBind);
};