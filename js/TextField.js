var TextField = function(text, fontType, fontSize, fontColor, textAlign)
{
	DisplayObject.call(this);

	this.text = text;
	this.fontType = fontType;
	this.fontSize = fontSize;
	this.fontColor = fontColor;
	this.textAlign = textAlign;

	this.getFont = function() {
		return this.fontSize + 'pt ' + this.fontType;
	};
};