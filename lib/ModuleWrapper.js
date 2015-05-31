function ModuleWrapper (module, parent) {
	var siblings = parent ? module.parent.children : [];
	this.parent = parent;
	this.children = [];
	this.numSiblings = siblings.length;
	this.isNpmModule = /\/node_modules\//.test(module.id);
	this.name = this.isNpmModule ? module.id.match(/\/node_modules\/[^\/]+/)[0] : module.id;
	this.isFirstChild = siblings.indexOf(module) === 0;
	this.isLastChild = siblings.indexOf(module) === siblings.length - 1;

	if (!this.isNpmModule) {
		for (var i = 0, len = module.children.length; i < len; i += 1) {
			this.children.push(new ModuleWrapper(module.children[i], this));
		}
	}
}

// This is used for trimming the full path from the loaded modules
var dirLength = __dirname.length;

ModuleWrapper.prototype = {
	getIndentString: function () {
		var result = this.children.length === 0 ? '──' : '─┬';

		if (!this.parent) return '';

		if (this.isLastChild) {
			result = '└' + result;
		}
		else {
			result = '├' + result;
		}

		var parent = this.parent;
		while (parent && parent.parent) {
			result = ' ' + result;

			if (parent.isLastChild) {
				result = ' ' + result;
			}
			else {
				result = '│' + result;
			}

			parent = parent.parent;
		}

		return result;
	},
	log: function () {
		var indentString = this.getIndentString();
		var name = '.' + (this.isNpmModule ? this.name : this.name.substr(dirLength));

		console.log(indentString + name);

		for (var i = 0, len = this.children.length; i < len; i += 1) {
			this.children[i].log();
		}
	}
};

module.exports = ModuleWrapper;