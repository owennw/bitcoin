var fileSystem = require('fs');
var crypto = require('crypto');

fileSystem.readFile('C:\\dev\\bitcoin\\genesis_block.txt', function (err, logData) {
	if (err) throw err;

	var text = logData.toString();
    var block = JSON.parse(text);

	console.log(block);
});