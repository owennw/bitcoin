(function() {
	'use strict';
	var bitcoin = require('./bitcoin.js');

	var hash = process.argv[2];

	bitcoin.fetch(hash, function(block) {
		var correct = bitcoin.verify(block);
		console.log(correct ? "The hash is correct!" : "The hash is incorrect!");
	});
})();
