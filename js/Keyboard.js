var Keyboard = function()
{
	var keydownHandler = function(e) {
		switch(e.keyCode){
			case Keyboard.KEY_CODES['left']:
				Keyboard.pressedKeys['left'] = true;
				break;

			case Keyboard.KEY_CODES['up']:
				Keyboard.pressedKeys['up'] = true;
				break;

			case Keyboard.KEY_CODES['right']:
				Keyboard.pressedKeys['right'] = true;
				break;

			case Keyboard.KEY_CODES['down']:
				Keyboard.pressedKeys['down'] = true;
				break;

			case Keyboard.KEY_CODES['space']:
				Keyboard.pressedKeys['space'] = true;
				break;	
		}
	};

	var keyupHandler = function(e) {
		switch(e.keyCode){
			case Keyboard.KEY_CODES['left']:
				Keyboard.pressedKeys['left'] = false;
				break;

			case Keyboard.KEY_CODES['up']:
				Keyboard.pressedKeys['up'] = false;
				break;

			case Keyboard.KEY_CODES['right']:
				Keyboard.pressedKeys['right'] = false;
				break;

			case Keyboard.KEY_CODES['down']:
				Keyboard.pressedKeys['down'] = false;
				break;

			case Keyboard.KEY_CODES['space']:
				Keyboard.pressedKeys['space'] = false;
				break;	
		}
	};

	window.addEventListener('keydown', keydownHandler.bind(this), false);
	window.addEventListener('keyup', keyupHandler.bind(this), false);
}

Keyboard.KEY_CODES = {
	'space':32, 'left':37, 'up':38, 'right':39, 'down':40
};
Keyboard.pressedKeys = {};