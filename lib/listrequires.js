// require() caches modules, and cached modules only appear in the
// module.children of the FIRST module that require()s them.
// This wraps an extension compiler function, injecting a sneaky
// 'delete' of the cache so that children appear everywhere they
// are require()d.
function wrapExtensionCompiler (fn) {
	return function (module, filename) {
		var args = Array.prototype.slice.call(arguments);
		var nm = module.id.match(/\/node_modules\//g);
		var deleteCache = !nm || nm.length < 2;

		if (deleteCache) {
			delete require.cache[module.id];
		}

		fn.apply(null, args);
	};
}

// Loop through and wrap all require extensions
for (var extension in require.extensions) {
	require.extensions[extension] = wrapExtensionCompiler(require.extensions[extension]);
}

var ModuleWrapper = require('./ModuleWrapper');

module.exports = function (filename) {
	// Grab the supplied filename and load the respective module
	require(filename);

	// Trigger the recursive lookup, passing in the required module
	if (module.children[1]) {
		var theModule = new ModuleWrapper(module.children[1]);
		theModule.log();
	}
};