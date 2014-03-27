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
var keyCode;

module("Keyboard", {
	setup: function() {
		core = new Core();
		core.init();
		keyCode = Keyboard.KEY_CODES['Left'];
	}, teardown: function() {

	}
});

test("When the user press a keyboard key, I need to know if the key is pressed", function() {
	var evt = new KeyboardEvent('keydown');
	delete evt.keyCode;
	evt.keyCode = keyCode;
	window.dispatchEvent(evt);
	ok(Keyboard.pressedKeys[keyCode]);
});

test("When the user press a keyboard key, and after release the key, I need to know if the key is unpressed", function() {
	var evt = new KeyboardEvent('keydown');
	delete evt.keyCode;
	evt.keyCode = keyCode;
	window.dispatchEvent(evt);
	ok(Keyboard.pressedKeys[keyCode]);
	var evtUp = new KeyboardEvent('keyup');
	delete evtUp.keyCode;
	evtUp.keyCode = keyCode;
	window.dispatchEvent(evtUp);
	ok(!Keyboard.pressedKeys[keyCode]);
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

/**********************/
/*  EVENT DISPATCHER  */
/**********************/
var eventDispatcher;
var eventName;
var func;

module("EventDispatcher" , {
	setup: function() {
		core = new Core();
		core.init();
		eventDispatcher = new EventDispatcher();
		eventName = 'testEvent';

	}, teardown: function() {

	}
});

asyncTest("When I dispatch a Event with only text, the EventDispatcher must be transform the event in a object with a type property equals to the text passed", function() {
	expect(1);
	eventDispatcher.receive = function(e) {
		ok(e.type == eventName);
		start();
	};
	eventDispatcher.addEventListener(eventName, eventDispatcher.receive);
	eventDispatcher.dispatchEvent(eventName);
});

test("When I add and remove a listener, the EventDispatcher must clean the listener passed", function() {
	expect(2);
	eventDispatcher.addEventListener(eventName, func);
	var listeners = eventDispatcher._listeners;
	var hasListener = false;
	for (var i = 0; i < listeners[eventName].length; i++) {
		if (listeners[eventName][i] == func) {
			hasListener = true;
			break;
		}
	}
	ok(hasListener);

	eventDispatcher.removeEventListener(eventName, func);
	listeners = eventDispatcher._listeners;
	if (listeners[eventName].length == 0) {
		hasListener = false;
	}

	for (var i = 0; i < listeners[eventName].length; i++) {
		if (listeners[eventName][i] == func) {
			hasListener = true;
		} else {
			hasListener = false;
		}
	}
	ok(!hasListener);
});

test("When I add a event with a invalid type, the eventDispatcher must throws a Error", function() {
	throws(
		function() {
			eventDispatcher.dispatchEvent(1);
		},
			Error,
			'raised error is Error'
	);

	throws(
		function() {
			eventDispatcher.dispatchEvent(1);
		},
			/Event object missing 'type' property./,
			'raised error message is Event object missing type property.'
	);
});

/**********************/
/*      TWEEN         */
/**********************/
var tween;
var target;
var finalPosX = 100;
var finalPosY = 10;

module("Tween", {
	setup: function() {
		target = {x: 0, y: 0}
		tween = new Tween(target);
	}, teardown: function() {

	}
});

test("When I add a Tween.moveTo with no ease, the default ease must be Ease.linear", function() {
	tween.moveTo({x:0, y:0});
	ok(tween.properties['x'].ease == Ease.linear);
	ok(tween.properties['y'].ease == Ease.linear);
});

asyncTest("When the Tween finished, the target must be in the final position", function() {
	expect(2);
	tween.addEventListener('complete', function(e) {
		ok(target.x == finalPosX);
		ok(target.y == finalPosY);
		start();
	});
	tween.moveTo(finalPosX, finalPosY, 5);
	tween.start();
});

//Ease.Quad
asyncTest("When the Tween with Ease.easeInQuad finished, the target must be in the final position", function() {
	expect(2);
	tween.addEventListener('complete', function(e) {
		ok(target.x == finalPosX);
		ok(target.y == finalPosY);
		start();
	});
	tween.moveTo(finalPosX, finalPosY, 5, Ease.easeInQuad);
	tween.start();
});

asyncTest("When the Tween with Ease.easeOutQuad finished, the target must be in the final position", function() {
	expect(2);
	tween.addEventListener('complete', function(e) {
		ok(target.x == finalPosX);
		ok(target.y == finalPosY);
		start();
	});
	tween.moveTo(finalPosX, finalPosY, 5, Ease.easeOutQuad);
	tween.start();
});

asyncTest("When the Tween with Ease.easeInOutQuad finished, the target must be in the final position", function() {
	expect(2);
	tween.addEventListener('complete', function(e) {
		ok(target.x == finalPosX);
		ok(target.y == finalPosY);
		start();
	});
	tween.moveTo(finalPosX, finalPosY, 5, Ease.easeInOutQuad);
	tween.start();
});

//Ease.Elastic
asyncTest("When the Tween with Ease.easeInElastic finished, the target must be in the final position", function() {
	expect(2);
	tween.addEventListener('complete', function(e) {
		ok(target.x == finalPosX);
		ok(target.y == finalPosY);
		start();
	});
	tween.moveTo(finalPosX, finalPosY, 5, Ease.easeInElastic);
	tween.start();
});

asyncTest("When the Tween with Ease.easeOutElastic finished, the target must be in the final position", function() {
	expect(2);
	tween.addEventListener('complete', function(e) {
		ok(target.x == finalPosX);
		ok(target.y == finalPosY);
		start();
	});
	tween.moveTo(finalPosX, finalPosY, 5, Ease.easeOutElastic);
	tween.start();
});

asyncTest("When the Tween with Ease.easeInOutElastic finished, the target must be in the final position", function() {
	expect(2);
	tween.addEventListener('complete', function(e) {
		ok(target.x == finalPosX);
		ok(target.y == finalPosY);
		start();
	});
	tween.moveTo(finalPosX, finalPosY, 5, Ease.easeInOutElastic);
	tween.start();
});

/**********************/
/*    TWEEN GROUP     */
/**********************/
var tweenGroup;

module("TweenGroup", {
	setup: function() {
		tweenGroup = new TweenGroup(new Sprite());
	}, teardown: function() {

	}
});

test("When I added one tween by group.moveTo, the tween need to be started", function() {
	tweenGroup.moveTo(100, 50, 30, Ease.easeOutQuad);
	ok(tweenGroup.tweens[0].running = true);
});

test("When I added two tween by group.moveTo, the second tween need to be stoped", function() {
	tweenGroup.moveTo(100, 50, 30, Ease.easeOutQuad);
	tweenGroup.moveTo(10, 150, 10, Ease.easeOutQuad);
	ok(tweenGroup.tweens[1].running == false);
});

asyncTest("When I added two tween by group.moveTo, the second tween need starts when the first one stop", function() {
	expect(1);
	tweenGroup.moveTo(100, 50, 3, Ease.easeOutQuad);
	tweenGroup.moveTo(10, 150, 5, Ease.easeOutQuad);
	tweenGroup.addEventListener('tween_completed', function(e) {
		ok(tweenGroup.tweens[0].running == true);
		start();
	});
});

asyncTest("When I added a tween by group.to, when the tween finish, the target must be with the correct properties values", function() {
	expect(4);
	var xValue = 30;
	var yValue = 20;
	var opacityValue = .5;
	var scaleYValue = 2;
	var target = tweenGroup.target;
	tweenGroup.addEventListener('complete', function(e) {
		ok(target.x == xValue);
		ok(target.y == yValue);
		ok(target.opacity == opacityValue);
		ok(target.scaleY == scaleYValue);
		start();
	});
	tweenGroup.to(4, {x:xValue, y: yValue, opacity: opacityValue, scaleY: scaleYValue});
});