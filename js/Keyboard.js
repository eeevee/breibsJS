var Keyboard = function()
{
	var KEY_CODES = {
		'space':32, 'left':37, 'up':38, 'right':39, 'down':40
	};

	var keydownHandler = function(e) {
		switch(e.keyCode){
			case KEY_CODES['left']:
				Keyboard.pressedKeys['left'] = true;
				break;

			case KEY_CODES['up']:
				Keyboard.pressedKeys['up'] = true;
				break;

			case KEY_CODES['right']:
				Keyboard.pressedKeys['right'] = true;
				break;

			case KEY_CODES['down']:
				Keyboard.pressedKeys['down'] = true;
				break;

			case KEY_CODES['space']:
				Keyboard.pressedKeys['space'] = true;
				break;	
		}
	};

	var keyupHandler = function(e) {
		switch(e.keyCode){
			case KEY_CODES['left']:
				Keyboard.pressedKeys['left'] = false;
				break;

			case KEY_CODES['up']:
				Keyboard.pressedKeys['up'] = false;
				break;

			case KEY_CODES['right']:
				Keyboard.pressedKeys['right'] = false;
				break;

			case KEY_CODES['down']:
				Keyboard.pressedKeys['down'] = false;
				break;

			case KEY_CODES['space']:
				Keyboard.pressedKeys['space'] = false;
				break;	
		}
	};

	window.addEventListener('keydown', keydownHandler.bind(this), false);
	window.addEventListener('keyup', keyupHandler.bind(this), false);
}

Keyboard.pressedKeys = {};