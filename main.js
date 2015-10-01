(function() {
  'use strict';
  var bitcoin = require('./bitcoin.js');

  var hash = process.argv[2];

  bitcoin.fetch(hash).then(bitcoin.verify).then(function(result) {
    console.log(result ? 'The hash is correct!' : 'The hash is incorrect!');
  });
})();
