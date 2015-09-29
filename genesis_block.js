var fileSystem = require('fs');
var crypto = require('crypto');

var fileName = 'block_example';

fileSystem.readFile('C:\\dev\\bitcoin\\' + fileName + '.txt', function (err, logData) {
	if (err) throw err;

	var text = logData.toString();
    var block = JSON.parse(text);

	console.log(block);

	verify(block);
});

function verify(block) {
	var version = block.version;
	var previousBlockHash = block.previousblockhash || '';
	var merkleRoot = block.merkleroot;
	var time = block.time.toString(16);
	var bits = block.bits;
	var nonce = block.nonce.toString(16);

	// create the header value in hexadecimal
	// Note: Bitcoin uses big-endian notation, so all the components must be converted
	// to little-endian.
	var hexHeader = numberToHex(version) + 
		bigToLittleEndian(previousBlockHash) + 
		bigToLittleEndian(merkleRoot) + 
		numberToHex(time) + 
		bigToLittleEndian(bits) + 
		numberToHex(nonce);

	console.log(hexHeader);
}

function toArray(s) {
	var output = [];
	for (var i = 0; i < s.length; i += 2) {
		output.push(s.substr(i, 2));
	}
	return output;
}

function bigToLittleEndian(s) {
	return toArray(s).reverse().join('');
}

function numberToHex(n) {
	// Format this number to have 8 digits
	return bigToLittleEndian(("0000000" + n.toString(16)).substr(-8));
}