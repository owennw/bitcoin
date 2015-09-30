(function() {
    'use strict';
    var bitcoin = require('../bitcoin');
    describe('Bitcoin suite', function() {
        it('contains tests for fetching and validating bitcoin blocks', function() {
            var hash = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f';
            var block = '';

            runs(function () {
                bitcoin.fetch(hash, function (b) {
                    block = b;
                });
            });

            waitsFor(function () {
                return block !== '';
            }, 'block should be fetched', 1000);

            runs(function () {
                check(
                    block,
                    '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
                    376866,
                    285,
                    0,
                    1,
                    '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
                    '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
                    1231006505,
                    2083236893,
                    '1d00ffff',
                    1,
                    '0000000000000000000000000000000000000000000000000000000100010001',
                    '00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048',
                    true);
            });
        });
    });

    function check(block, hash, conf, size, height, v, mr, tx, t, n, b, d, ch, nbh, imc) {
        expect(block.hash).toEqual(hash);
        expect(block.confirmations).toEqual(conf); // this is dynamic, so might change
        expect(block.size).toEqual(size);
        expect(block.height).toEqual(height);
        expect(block.version).toEqual(v);
        expect(block.merkleroot).toEqual(mr);
        expect(block.tx.toString()).toEqual(tx);
        expect(block.time).toEqual(t);
        expect(block.nonce).toEqual(n);
        expect(block.bits).toEqual(b);
        expect(block.difficulty).toEqual(d);
        expect(block.chainwork).toEqual(ch);
        expect(block.nextblockhash).toEqual(nbh);
        expect(block.isMainChain).toEqual(imc);
    };
})();