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
		core.render.canRender = false;
		delete core;
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

asyncTest("When I click in a sprite inside canvas, the sprite must receive the click", function() {
	expect(1);
	core.addEventListener('load', function(e) {
		var sprite = new Sprite(30,30);
		sprite.image = core.assets['../img/wizard_evil.png'];
		sprite.addEventListener('mousedown', function(e) {
			clearTimeout(timeoutId);
			ok(true);
			start();
		});
		core.rootScene.addChild(sprite);
		var mouseEvent = new MouseEvent('mousedown');
		delete mouseEvent.layerX;
		delete mouseEvent.layerY;
		mouseEvent.layerX = 10;
		mouseEvent.layerY = 10;
		surface.canvas.dispatchEvent(mouseEvent);
	});
	
	core.preloadAsset('../img/wizard_evil.png');
	var timeoutId = setTimeout(function() {
		ok(false);
		start();
	}, 100);
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
		core.render.canRender = false;
		delete core;
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
		core.render.canRender = false;
		delete core;
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
     	core.render.canRender = false;
		delete core;
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

test("When I create a tween.to and pass a ease function, the ease need to be setted", function() {
	tween.to(2, {x:finalPosX, ease: Ease.easeInElastic});
	ok(tween.properties['x'].ease == Ease.easeInElastic);
});

/**********************/
/*    TWEEN GROUP     */
/**********************/
var tweenGroup;
var tweenTarget;

module("TweenGroup", {
	setup: function() {
		tweenTarget = new Sprite(20, 20);
		tweenGroup = new TweenGroup(tweenTarget);
	}, teardown: function() {
		delete tweenGroup;
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

asyncTest("When I added a tween by group.scaleTo, when the tween finish, the target must be with the correct properties values", function() {
	expect(2);
	var scaleXValue = 2;
	var scaleYValue = 2;
	var target = tweenGroup.target;
	tweenGroup.addEventListener('complete', function(e) {
		ok(target.getScaleX() == scaleXValue);
		ok(target.getScaleY() == scaleYValue);
		start();
	});
	tweenGroup.scaleTo(scaleXValue, scaleYValue, 4);
});

asyncTest("When I added a tween by group.to, when the tween finish, the target must be with the correct properties values", function() {
	expect(4);
	var xValue = 30;
	var yValue = 20;
	var opacityValue = .5;
	var scaleYValue = 2;
	var target = tweenGroup.target;
	var callback = function(e) {
		ok(target.x == xValue);
		ok(target.y == yValue);
		ok(target.opacity == opacityValue);
		ok(target.getScaleY() == scaleYValue);
		start();
	}
	tweenGroup.addEventListener('complete', callback);
	tweenGroup.to(4, {x:xValue, y: yValue, opacity: opacityValue, scaleY: scaleYValue});
});

asyncTest("When I add two tweens to a group, and set the group to loop, when the first tween stops, it has to stay in the end of the queue", function() {
	expect(1);
	var xEndPos = 10;
	tweenGroup.moveTo(xEndPos, 10, 2).moveTo(20, 20, 4).setLoop(true);
	var callback = function(e) {
		ok(tweenGroup.tweens[1].properties.x.endPos == xEndPos);
		tweenGroup.removeEventListener('tween_completed', callback);
		start();
	};
	tweenGroup.addEventListener('tween_completed', callback);
});

/**********************/
/*     COLLISION      */
/**********************/
var point;

module("Collisions", {
	setup: function() {
		core = new Core();
		core.init();
		sprite1 = new Sprite(10, 10);
		sprite2 = new Sprite(10, 10);
		core.rootScene.addChild(sprite1);
		core.rootScene.addChild(sprite2);
	}, teardown: function() {
		core.render.canRender = false;
		delete core;
	}
});

test("When two sprites collides, I need to know that the collision occurred", function() {
	ok(sprite1.boxCollides(sprite2));
});

test("When two sprites not collides, I need to know that the collision don't occurred", function() {
	sprite1.x = 300;
	ok(!sprite1.boxCollides(sprite2));
});

test("When a point is inside a sprite1, I need to know that a collision occurred", function() {
	point = {x: 5, y: 5};
	ok(sprite1.pointCollides(point));
});

test("When a point is outside a sprite1, I need to know that a collision don't occurred", function() {
	point = {x: 55, y: 55};
	ok(!sprite1.pointCollides(point));
});

/**********************/
/*       SPRITE       */
/**********************/
module("Sprite", {
	setup: function() {
		sprite1 = new Sprite(16, 16);
	}, teardown: function() {
		sprite1 = null;
	}
});

test("When I change a sprite's width and height, the scaleX and scaleY need to change according", function() {
	sprite1.width = 32;
	sprite1.height = 40;
	ok(sprite1.getScaleX() == 2);
	ok(sprite1.getScaleY() == 2.5);
});

/**********************/
/*       SURFACE      */
/**********************/
var surface;

module("Surface", {
	setup: function() {
		
	}, teardown: function() {
		if (document.body.contains(surface.canvas)) {
			document.body.removeChild(surface.canvas);
		}
	}
});

asyncTest("When I create a surface, if the addToDocument parameter is true, I need to attach this to the document's body", function() {
	expect(1);
	surface = new Surface(100, 100);
	setTimeout(function() {
		ok(document.querySelector('canvas'));
		start();
	}, 50);
});

asyncTest("When I create a surface, if the addToDocument parameter is false, I don't need to attach this to the document's body", function() {
	expect(1);
	surface = new Surface(100, 100, false);
	setTimeout(function() {
		ok(!document.querySelector('canvas'));
		start();
	}, 50);
});