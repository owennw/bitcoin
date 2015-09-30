(function() {
	'use strict';
	var bitcoin = require('./bitcoin.js');

	var hash = process.argv[2];

	bitcoin.fetch(hash, function(block) {
		 bitcoin.verify(block);
	});
})();
