var Maps = {
	map1:  {
			tiles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
					[1, 5, 0, 0, 1, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 9, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
			chests: 1
			},

	map2:  {
			tiles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 3, 1, 0, 3, 0, 0, 0, 1],
					[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
					[1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 9, 0, 0, 0, 0, 5, 0, 0, 1],
					[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
			chests: 2
			},
	map3:  {
			tiles: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
					[1, 0, 0, 3, 1, 0, 3, 0, 0, 0, 1, 1, 1, 1, 1],
					[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
					[1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
					[1, 0, 9, 0, 0, 0, 0, 5, 0, 0, 1, 1, 1, 1, 1],
					[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
					[1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
			chests: 2
			}
};

var TileMap = function(maps, tileWidth, tileHeight, scene)
{
	var maps = maps;
	var currentMapIndex = 0;
	var map = maps[currentMapIndex];
	var hero = null;
	var positionIncrement = 16;
	var score = 0;

	var keyboardHandler = function(e) {
		if (Keyboard.pressedKeys[Keyboard.KEY_CODES['Left']]) {
			verifyMovements(hero, 'left');
		} else if (Keyboard.pressedKeys[Keyboard.KEY_CODES['Right']]) {
			verifyMovements(hero, 'right');
		} else if (Keyboard.pressedKeys[Keyboard.KEY_CODES['Up']]) {
			verifyMovements(hero, 'up');
		} else if (Keyboard.pressedKeys[Keyboard.KEY_CODES['Down']]) {
			verifyMovements(hero, 'down');
		}
	};

	var verifyMovements = function(target, direction) {
		if (canMove(target, direction)) {
			var nextTile = getNextTileByDirection(target, direction);
			if (nextTile.type == 3) {
				moveItem(nextTile, direction);
			}
			var nextPoint = getNextPointByDirection(target, direction);
			target.x = nextPoint.row * tileWidth;
			target.y = nextPoint.col * tileHeight;
		}
	};

	var getNextTileByDirection = function(target, direction) {
		var pt = getNextPointByDirection(target, direction);
		if (pt.col < 0 || pt.row < 0 || pt.col >= map.tiles.length || pt.row >= map.tiles[0].length) return;
		return map.tiles[pt.col][pt.row];
	};

	var getNextPointByDirection = function(target, direction) {
		var row = null;
		var col = null;
		if (direction == 'left') {
			row = Math.floor((target.x - tileWidth) / tileWidth);
			col = Math.floor((target.y) / tileWidth);
		} else if (direction == 'right') {
			row = Math.floor((target.x + tileWidth) / tileWidth);
			col = Math.floor((target.y) / tileWidth);
		} else if (direction == 'up') {
			row = Math.floor((target.x) / tileWidth);
			col = Math.floor((target.y - tileHeight) / tileWidth);
		} else if (direction == 'down') {
			row = Math.floor((target.x) / tileWidth);
			col = Math.floor((target.y + tileHeight) / tileWidth);
		}

		return {col: col, row: row};
	};

	var getTargetPoint = function(target) {
		return {col: Math.floor(target.y / tileWidth), row: Math.floor(target.x / tileWidth)};
	};

	var canMove = function(target, direction) {
		var nextTile = getNextTileByDirection(target, direction);
		var nextNextTile = getNextTileByDirection(nextTile, direction);
		if (nextTile.type == 1 || nextTile.type == 6 || nextTile.type == 5) return false;
		if (nextTile.type == 3 && (nextNextTile.type == 1 || nextNextTile.type == 3 || nextNextTile.type == 6)) return false;
		return true;
	};

	var moveItem = function(target, direction) {
		var nextNextTile = getNextTileByDirection(target, direction);
		var dummy = {x: target.x, y: target.y, type: 0};
		var pt = getTargetPoint(target, direction);
		//get the box coordinates
		var newPt = getNextPointByDirection(target, direction);
		if (nextNextTile.type == 5) {
			//remove item and opened box sprites
			scene.removeChildAt(scene.getChildIndex(target));
			scene.removeChildAt(scene.getChildIndex(nextNextTile));
			//create a chest closed sprite
			s = new Sprite(tileWidth, tileHeight, core.assets['img/chest_closed.png']);
			s.x = newPt.row * tileWidth;
			s.y = newPt.col * tileHeight;
			scene.addChild(s);
			s.type = 6;
			//add the closed chest to map
			map.tiles[newPt.col][newPt.row] = s;
			//verify end of map
			score ++;
			if (verifyEndOfMap()) {
				gotoNextMap();
			}
		} else {
			//move the item
			target.x = newPt.row * tileWidth;
			target.y = newPt.col * tileHeight;
			map.tiles[newPt.col][newPt.row] = target;
		}
		//clear the old item position
		map.tiles[pt.col][pt.row] = dummy;
	};

	var verifyEndOfMap = function() {
		if (score == map.chests) {
			return true;
		}
		return false;
	};

	var clearScene = function() {
		//call the scene.clear in next versions of engine
		while (scene.childs.length) {
			scene.removeChildAt(0);
		}
		scene.childs = [];
	};

	var load = function(tileWidth, tileHeight, scene) {
		score = 0;
		for (var y = 0; y < map.tiles.length; y++) {
			for (var x = 0; x < map.tiles[y].length; x++) {
				if (map.tiles[y][x] == 1) {
					var s = new Sprite(tileWidth, tileHeight, core.assets['img/wall.png']);
					s.x = x * tileWidth;
					s.y = y * tileHeight;
					scene.addChild(s);
					s.type = 1;
					map.tiles[y][x] = s;
				} else if (map.tiles[y][x] == 9) {
					var s = new Sprite(tileWidth, tileHeight, core.assets['img/wizard.png']);
					s.x = x * tileWidth;
					s.y = y * tileHeight;
					scene.addChild(s);
					hero = s;
					s.type = 9;
					map.tiles[y][x] = s;
				} else if (map.tiles[y][x] == 5) {
					var s = new Sprite(tileWidth, tileHeight, core.assets['img/chest_opened.png']);
					s.x = x * tileWidth;
					s.y = y * tileHeight;
					scene.addChild(s);
					s.type = 5;
					map.tiles[y][x] = s;
				} else if (map.tiles[y][x] == 3) {
					var s = new Sprite(tileWidth, tileHeight, core.assets['img/key.png']);
					s.x = x * tileWidth;
					s.y = y * tileHeight;
					scene.addChild(s);
					s.type = 3;
					map.tiles[y][x] = s;
				} else {
					var s = {x: x * tileWidth, y: y * tileHeight, type: 0};
					map.tiles[y][x] = s;
				}
			}
		}
	};

	var gotoNextMap = function() {
		currentMapIndex ++;
		map = maps[currentMapIndex];
		clearScene();
		load(tileWidth, tileHeight, scene);
	};

	this.start = function() {
		core.addEventListener('enterframe', keyboardHandler.bind(this));
	};
	
	load(tileWidth, tileHeight, scene);
};