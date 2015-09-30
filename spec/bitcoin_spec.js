(function() {
    'use strict';
    var bitcoin = require('../bitcoin');
    describe('Bitcoin suite', function() {
       it('contains tests for fetching and validating bitcoin blocks', function() {
           var hash = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f';
           var block = '';

           runs(function() {
               bitcoin.fetch(hash, function(b) {
                   block = b;
               });
           });

           waitsFor(function() {
               return block !== '';
           }, 'block should be fetched', 1000);

           runs(function() {
               expect(block.hash).toEqual('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f');
               expect(block.confirmations).toEqual(376865);
               expect(block.size).toEqual(285);
               expect(block.height).toEqual(0);
               expect(block.version).toEqual(1);
               expect(block.merkleroot).toEqual('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b');
               expect(block.tx.toString()).toEqual('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b');
               expect(block.time).toEqual(1231006505);
               expect(block.nonce).toEqual(2083236893);
               expect(block.bits).toEqual('1d00ffff');
               expect(block.difficulty).toEqual(1);
               expect(block.chainwork).toEqual('0000000000000000000000000000000000000000000000000000000100010001');
               expect(block.nextblockhash).toEqual('00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048');
               expect(block.isMainChain).toEqual(true);
           });
       });
    });
})();