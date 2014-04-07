var Maps = {
	map1:  [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			[1, 5, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 9, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
};

var TileMap = function(map, tileWidth, tileHeight, scene)
{
	this.hero = null;
	this.boundaries = {top: 0, right: 0, down: 0, left:0};
	this.positionIncrement = 16;

	var keyboardHandler = function(e) {
		if (this.hero == null) return;
		if(Keyboard.pressedKeys[Keyboard.KEY_CODES['Up']]) {
			if (!this.checkWallCollision(this.hero, 'up')) {
				if (this.checkItemCollision('up')) {
					this.hero.y -= this.positionIncrement;
				}
			}
		} else if(Keyboard.pressedKeys[Keyboard.KEY_CODES['Down']]) {
			if (!this.checkWallCollision(this.hero, 'down')) {
				if (this.checkItemCollision('down')) {
					this.hero.y += this.positionIncrement;
				}
			}
		} else if(Keyboard.pressedKeys[Keyboard.KEY_CODES['Right']]) {
			if (!this.checkWallCollision(this.hero, 'right')) {
				if (this.checkItemCollision('right')) {
					this.hero.x += this.positionIncrement;
				}
			}
		} else if(Keyboard.pressedKeys[Keyboard.KEY_CODES['Left']]) {
			if (!this.checkWallCollision(this.hero, 'left')) {
				if (this.checkItemCollision('left')) {
					this.hero.x -= this.positionIncrement;
				}
			}
		}
	};

	this.checkWallCollision = function(target, direction) {
		if (direction == 'left') {
			if (target.x <= this.boundaries.left) return true;
		} else if (direction == 'right') {
			if (target.x >= this.boundaries.right) return true;
		} else if (direction == 'up') {
			if (target.y <= this.boundaries.top) return true;
		} else if (direction == 'down') {
			if (target.y >= this.boundaries.down) return true;
		}
		var pt = this.getNextTileByDirection(direction);
		if (map[pt.col][pt.row].type == 1) return true;
		return false;
	};

	this.checkItemCollision = function(direction) {
		var pt = this.getNextTileByDirection(direction);
		if (map[pt.col][pt.row].type == 3) {
			if (direction == 'left') {
				if (!this.checkWallCollision(map[pt.col][pt.row], direction)) {
					map[pt.col][pt.row].x -= this.positionIncrement;
					map[pt.col][pt.row - 1] = map[pt.col][pt.row]
					map[pt.col][pt.row] = 0;
					return true;
				} else {
					return false;
				}
				
			} else if (direction == 'right') {
				if (!this.checkWallCollision(map[pt.col][pt.row], direction)) {
					map[pt.col][pt.row].x += this.positionIncrement;
					map[pt.col][pt.row + 1] = map[pt.col][pt.row]
					map[pt.col][pt.row] = 0;
					return true;
				} else {
					return false;
				}
			} else if (direction == 'up') {
				if (!this.checkWallCollision(map[pt.col][pt.row], direction)) {
					map[pt.col][pt.row].y -= this.positionIncrement;
					map[pt.col - 1][pt.row] = map[pt.col][pt.row]
					map[pt.col][pt.row] = 0;
					return true;
				} else {
					return false;
				}
			} else if (direction == 'down') {
				if (!this.checkWallCollision(map[pt.col][pt.row], direction)) {
					map[pt.col][pt.row].y += this.positionIncrement;
					map[pt.col + 1][pt.row] = map[pt.col][pt.row]
					map[pt.col][pt.row] = 0;
					return true;
				} else {
					return false;
				}
			}
		}

		return true;
	};

	this.getNextTileByDirection = function(direction) {
		var row = null;
		var col = null;
		if (direction == 'left') {
			row = Math.floor((this.hero.x - tileWidth) / tileWidth);
			col = Math.floor((this.hero.y) / tileWidth);
		} else if (direction == 'right') {
			row = Math.floor((this.hero.x + tileWidth) / tileWidth);
			col = Math.floor((this.hero.y) / tileWidth);
		} else if (direction == 'up') {
			row = Math.floor((this.hero.x) / tileWidth);
			col = Math.floor((this.hero.y - tileHeight) / tileWidth);
		} else if (direction == 'down') {
			row = Math.floor((this.hero.x) / tileWidth);
			col = Math.floor((this.hero.y + tileHeight) / tileWidth);
		}

		return {row: row, col: col};
	};

	this.load = function(map, tileWidth, tileHeight, scene) {
		for (var y = 0; y < map.length; y++) {
			for (var x = 0; x < map[y].length; x++) {
				if (map[y][x] == 1) {
					var s = new Sprite(tileWidth, tileHeight, core.assets['img/wall.png']);
					s.x = x * tileWidth;
					s.y = y * tileHeight;
					scene.addChild(s);
					s.type = 1;
					map[y][x] = s;
				} else if (map[y][x] == 9) {
					var s = new Sprite(tileWidth, tileHeight, core.assets['img/wizard.png']);
					s.x = x * tileWidth;
					s.y = y * tileHeight;
					scene.addChild(s);
					this.hero = s;
					s.type = 9;
					map[y][x] = s;
				} else if (map[y][x] == 5) {
					var s = new Sprite(tileWidth, tileHeight, core.assets['img/box.png']);
					s.x = x * tileWidth;
					s.y = y * tileHeight;
					scene.addChild(s);
					s.type = 5;
					map[y][x] = s;
				} else if (map[y][x] == 3) {
					var s = new Sprite(tileWidth, tileHeight, core.assets['img/knife.png']);
					s.x = x * tileWidth;
					s.y = y * tileHeight;
					scene.addChild(s);
					s.type = 3;
					map[y][x] = s;
				}
			}
		}
	};

	this.startHeroMovement = function() {
		core.addEventListener('enterframe', keyboardHandler.bind(this));
	};
	
	this.load(map, tileWidth, tileHeight, scene);
};