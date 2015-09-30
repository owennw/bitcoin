(function() {
	'use strict';
	var crypto = require('crypto');
	var buffer = require('buffer');
	var https = require('https');

	function doubleHash(hex) {
		return hashHexToHex(hashHexToHex(hex));
	}

	function calculateMerkleRoot(block) {
		var hashedTransactions = block.tx;

		while (hashedTransactions.length !== 1) {
			hashedTransactions = createNextTreeRow(hashedTransactions);
		}

		// This is now the merkleroot
		return hashedTransactions.toString();
	}

	function createNextTreeRow(currentRow) {
		var nextLevel = [];
		var size = currentRow.length;

		if (size % 2 === 1) {
			// There are an odd number of transactions, so the final hash is duplicated
			currentRow.push(currentRow[size - 1]);
		}

		for (var i = 0; i < size; i += 2) {
			var nextHash = swapEndian(doubleHash(swapEndian(currentRow[i]) + swapEndian(currentRow[i + 1])));
			nextLevel.push(nextHash);
		}

		return nextLevel;
	}

	function hashHexToHex(hex) {
		var inputBuffer = new Buffer(hex, 'hex');

		var hash = crypto.createHash('sha256');
		hash.update(inputBuffer);
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

	module.exports = {
		fetch: function(hash, callback) {
			var options = {
				hostname: 'blockexplorer.com',
				path: '/api/block/' + hash
			};

			var requestCallback = function(res) {
				var str = '';
				res.on('data', function(d) {
					str += d;
				});

				res.on('end', function() {
					callback(JSON.parse(str));
				});
			};

			https.request(options, requestCallback).end();
		},

		verify: function(block) {
			// The previous block hash may not be present
			var previousBlockHash = block.previousblockhash === undefined ?
				'0000000000000000000000000000000000000000000000000000000000000000' : block.previousblockhash;

			// create the header value in hexadecimal
			// Note: Bitcoin uses big-endian notation, so all the components must be converted
			// to little-endian.
			var hexHeader = 
				swapEndian(numberToHex(block.version)) + 
				swapEndian(previousBlockHash) + 
				swapEndian(calculateMerkleRoot(block)) + 
				swapEndian(numberToHex(block.time.toString(16))) + 
				swapEndian(block.bits) + 
				swapEndian(numberToHex(block.nonce.toString(16)));

			var hash2 = doubleHash(hexHeader);
			var finalHash = swapEndian(hash2);

			// Finally verify the hash
			console.log(finalHash === block.hash ? "The hash is correct!" : "The hash is incorrect!");
		}
	};
})();