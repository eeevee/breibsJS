var MemoryCard = function()
{
	this.getString = function(key) {
		var value = localStorage.getItem(key);
		return value;
	};

	this.saveString = function(key, value) {
		localStorage.setItem(key, value);
	};

	this.getObject = function(key) {
		var obj = JSON.parse(this.getString(key));
		return obj;
	};

	this.saveObject = function(key, obj) {
		this.saveString(key, JSON.stringify(obj));
	};
};