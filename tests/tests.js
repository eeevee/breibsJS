var core;
var scene1;
var SCENE_1_NAME = 'scene1';

/**********************/
/*       CORE         */
/**********************/
module("Core", {
	setup: function() {
		core = new Core();
		core.init();
		scene1 = new Scene('scene1');
		core.addScene(scene1);
	}, teardown: function() {

	}
});

test("When I start the Core, I need to have a root scene", function() {
	ok(core.rootScene);
	ok(core.getScene('root'));
});

test("When I add a scene to Core, i need to recover it by name", function() {
	ok(core.getScene(SCENE_1_NAME));
});

test("When I change the scene, the Core current scene want to be the new scene", function() {
	core.changeScene(SCENE_1_NAME);
	ok(core.currentScene === scene1);
});

test("When I try to change to a scene that not exists, the Core need to throw a  Scene not found CoreException", function() {
	throws(
		function() {
			core.changeScene('not real scene')
		},
			CoreException,
			'raised error is CoreException'
	);

	throws(
		function() {
			core.changeScene('not real scene')
		},
			/Scene not found/,
			'raised error message is Scene not found'
	);
});

asyncTest("When I preload a image, when the image load finished, i need to retrive the image", function() {
	expect(1);

	core.addEventListener('load', function(e) {
		ok(core.assets['../img/wizard_evil.png']);
		start();
	});
	core.preloadAsset('../img/wizard_evil.png');
});

/**********************/
/*     KEYBOARD       */
/**********************/
module("Keyboard", {
	setup: function() {
		core = new Core();
		core.init();
	}, teardown: function() {

	}
});

test("When the user press the left key, I need to know if the left key is pressed", function() {
	var evt = new KeyboardEvent('keydown');
	delete evt.keyCode;
	evt.keyCode = Keyboard.KEY_CODES['left'];
	window.dispatchEvent(evt);
	ok(Keyboard.pressedKeys['left']);
});

test("When the user press the left key, and after release the key, I need to know if the left key is unpressed", function() {
	var evt = new KeyboardEvent('keydown');
	delete evt.keyCode;
	evt.keyCode = Keyboard.KEY_CODES['left'];
	window.dispatchEvent(evt);
	ok(Keyboard.pressedKeys['left']);
	var evtUp = new KeyboardEvent('keyup');
	delete evtUp.keyCode;
	evtUp.keyCode = Keyboard.KEY_CODES['left'];
	window.dispatchEvent(evtUp);
	ok(!Keyboard.pressedKeys['left']);
});

test("When the user press the right key, I need to know if the right key is pressed", function() {
	var evt = new KeyboardEvent('keydown');
	delete evt.keyCode;
	evt.keyCode = Keyboard.KEY_CODES['right'];
	window.dispatchEvent(evt);
	ok(Keyboard.pressedKeys['right']);
});

test("When the user press the right key, and after release the key, I need to know if the right key is unpressed", function() {
	var evt = new KeyboardEvent('keydown');
	delete evt.keyCode;
	evt.keyCode = Keyboard.KEY_CODES['right'];
	window.dispatchEvent(evt);
	ok(Keyboard.pressedKeys['right']);
	var evtUp = new KeyboardEvent('keyup');
	delete evtUp.keyCode;
	evtUp.keyCode = Keyboard.KEY_CODES['right'];
	window.dispatchEvent(evtUp);
	ok(!Keyboard.pressedKeys['right']);
});

test("When the user press the up key, I need to know if the up key is pressed", function() {
	var evt = new KeyboardEvent('keydown');
	delete evt.keyCode;
	evt.keyCode = Keyboard.KEY_CODES['up'];
	window.dispatchEvent(evt);
	ok(Keyboard.pressedKeys['up']);
});

test("When the user press the up key, and after release the key, I need to know if the up key is unpressed", function() {
	var evt = new KeyboardEvent('keydown');
	delete evt.keyCode;
	evt.keyCode = Keyboard.KEY_CODES['up'];
	window.dispatchEvent(evt);
	ok(Keyboard.pressedKeys['up']);
	var evtUp = new KeyboardEvent('keyup');
	delete evtUp.keyCode;
	evtUp.keyCode = Keyboard.KEY_CODES['up'];
	window.dispatchEvent(evtUp);
	ok(!Keyboard.pressedKeys['up']);
});

test("When the user press the down key, I need to know if the down key is pressed", function() {
	var evt = new KeyboardEvent('keydown');
	delete evt.keyCode;
	evt.keyCode = Keyboard.KEY_CODES['down'];
	window.dispatchEvent(evt);
	ok(Keyboard.pressedKeys['down']);
});

test("When the user press the down key, and after release the key, I need to know if the down key is unpressed", function() {
	var evt = new KeyboardEvent('keydown');
	delete evt.keyCode;
	evt.keyCode = Keyboard.KEY_CODES['down'];
	window.dispatchEvent(evt);
	ok(Keyboard.pressedKeys['down']);
	var evtUp = new KeyboardEvent('keyup');
	delete evtUp.keyCode;
	evtUp.keyCode = Keyboard.KEY_CODES['down'];
	window.dispatchEvent(evtUp);
	ok(!Keyboard.pressedKeys['down']);
});

test("When the user press the space key, I need to know if the space key is pressed", function() {
	var evt = new KeyboardEvent('keydown');
	delete evt.keyCode;
	evt.keyCode = Keyboard.KEY_CODES['space'];
	window.dispatchEvent(evt);
	ok(Keyboard.pressedKeys['space']);
});

test("When the user press the space key, and after release the key, I need to know if the space key is unpressed", function() {
	var evt = new KeyboardEvent('keydown');
	delete evt.keyCode;
	evt.keyCode = Keyboard.KEY_CODES['space'];
	window.dispatchEvent(evt);
	ok(Keyboard.pressedKeys['space']);
	var evtUp = new KeyboardEvent('keyup');
	delete evtUp.keyCode;
	evtUp.keyCode = Keyboard.KEY_CODES['space'];
	window.dispatchEvent(evtUp);
	ok(!Keyboard.pressedKeys['space']);
});

/**********************/
/*      SCENE         */
/**********************/
var sprite1;
var sprite2;
var sprite3;
var sprite4;

module("Scene", {
	setup: function() {
		core = new Core();
		core.init();
		sprite1 = new Sprite(1,1);
		sprite1.visible = false;
		sprite2 = new Sprite(1,1);
		sprite2.visible = false;
		sprite3 = new Sprite(1,1);
		sprite3.visible = false;
		sprite4 = new Sprite(1,1);
		sprite4.visible = false;
		core.rootScene.addChild(sprite1);
		core.rootScene.addChild(sprite2);
		core.rootScene.addChild(sprite3);
		core.rootScene.addChild(sprite4);
	}, teardown: function() {

	}
});

test("When I set a index to a scene child, if it is a valid index, the object index must change", function() {
	core.rootScene.setChildIndex(sprite2, 2);
	ok(core.rootScene.getChildIndex(sprite2) == 2);
});

test("When I set a index to a scene child, if it is a valid index, the previous objects index don't must change", function() {
	core.rootScene.setChildIndex(sprite2, 2);
	ok(core.rootScene.getChildIndex(sprite1) == 0);
});

test("When I set a index to a scene child, if it is a valid index, the next objects index don't must change", function() {
	core.rootScene.setChildIndex(sprite2, 2);
	ok(core.rootScene.getChildIndex(sprite4) == 3);
});

test("When I set a index to a scene child, if it is a valid index, the object that swap index must have a index decremented by 1", function() {
	var prevSprite3Index = core.rootScene.getChildIndex(sprite3);
	core.rootScene.setChildIndex(sprite2, 2);
	var nextSprite3Index = core.rootScene.getChildIndex(sprite3);
	ok(prevSprite3Index - nextSprite3Index == 1);
});

test("When I set a index to a scene child, if it is a invalid index, the scene must throws a Error", function() {
	throws(
		function() {
			core.rootScene.setChildIndex(sprite2, 20);
		},
			/Index out of bounds/,
			'raised error message is Index out of bounds'
	);
});

test("When I set a index to a scene child, if it is a invalid child, the scene must throws a SceneException", function() {
	throws(
		function() {
			core.rootScene.setChildIndex(new Sprite(1,1), 2);
		},
			SceneException,
			'raised error is SceneException'
	);

	throws(
		function() {
			core.rootScene.setChildIndex(new Sprite(1,1), 2);
		},
			/Child not found/,
			'raised error message is Child not found'
	);
});

test("When I add four child to core.rootScene, the childs length must be four", function() {
	ok(core.rootScene.childs.length == 4);
});
