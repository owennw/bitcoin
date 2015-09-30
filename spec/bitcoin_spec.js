(function() {
    'use strict';
    var bitcoin = require('../bitcoin');
    describe('Bitcoin', function() {
        it('should fetch a block', function() {
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

        it('should fetch a different block', function() {
            var hash = '00000000000000000b9f55f5d0857f5655698e15996deb29bf56548268d45550';
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
                    '00000000000000000b9f55f5d0857f5655698e15996deb29bf56548268d45550',
                    2010,
                    433,
                    374856,
                    3,
                    '6d7b74dad869f83d39f09254986f312c61ff5a2383973a216a9d5eb8ddf7c0aa',
                    'ca0a23d97c7836655c96d0111b10776e45a78290b59941d8cd27412a6d55e5c5,3cc19937d487f16dd22ec52646f14ccf147b5d507769ac7d06f45e0c6188332f',
                    1442448447,
                    2932541336,
                    '18134dc1',
                    56957648455.01001,
                    '0000000000000000000000000000000000000000000a3cea857ece8e71c7cec5',
                    '00000000000000000beebad7a81a2653ae01336d268819685b7ed7fd1e6354c4',
                    true,
                    '00000000000000000a9782a06ba2935bb59cfd4b81609e03c2f67aeac8491960');
            });
        });
    });

    function check(block, hash, conf, size, height, v, mr, tx, t, n, b, d, ch, nbh, imc, pbh) {
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
        expect(block.previousblockhash).toEqual(pbh);
    };
})();