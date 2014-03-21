var core;
var scene1;
var SCENE_1_NAME = 'scene1';

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