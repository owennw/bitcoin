var fileSystem = require('fs');
var crypto = require('crypto');

var fileName = 'block_example';

fileSystem.readFile('C:\\dev\\bitcoin\\' + fileName + '.txt', function (err, logData) {
	if (err) throw err;

	var text = logData.toString();
    var block = JSON.parse(text);

	verify(block);
});

function verify(block) {
	// create the header value in hexadecimal
	// Note: Bitcoin uses big-endian notation, so all the components must be converted
	// to little-endian.
	var hexHeader = 
		swapEndian(numberToHex(block.version)) + 
		swapEndian(block.previousblockhash || '') + 
		swapEndian(block.merkleroot) + 
		swapEndian(numberToHex(block.time.toString(16))) + 
		swapEndian(block.bits) + 
		swapEndian(numberToHex(block.nonce.toString(16)));

	// Convert the header to binary so that it can be hashed
	var hash1 = hashHexToHex(hexHeader);

	// It must be hashed twice...
	var hash2 = hashHexToHex(hash1);

	var finalHash = swapEndian(hash2);

	console.log(finalHash);
}

function hashHexToHex(hex) {
	// First convert the hex value to binary so it can be hashed
	var binary = hexToBin(hex);

	var hash = crypto.createHash('sha256');
	hash.update(binary);
	return hash.digest('hex');
}

function toArray(s) {
	var output = [];
	for (var i = 0; i < s.length; i += 2) {
		output.push(s.substr(i, 2));
	}
	return output;
}

function swapEndian(s) {
	return toArray(s).reverse().join('');
}

function numberToHex(n) {
	// Format this number to have 8 digits
	return ("0000000" + n.toString(16)).substr(-8);
}

function hexPairToBin(h) {
	// Format this number to have 8 digits
	return ("0000000" + parseInt(h, 16).toString(2)).substr(-8);
}

function hexToBin(h) {
	var result = '';
	var hexArray = toArray(h);
	for (var i = 0; i < hexArray.length; i += 1) {
		result += hexPairToBin(hexArray[i]);
	}

	return result;
}