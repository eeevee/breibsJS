var TextField = function(text, fontType, fontSize, textAlign)
{
	DisplayObject.call(this);

	this.text = text;
	this.fontType = fontType;
	this.fontSize = fontSize;
	this.textAlign = textAlign;

	this.getFont = function() {
		return this.fontSize + 'pt ' + this.fontType;
	};
};