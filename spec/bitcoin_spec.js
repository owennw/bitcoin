(function() {
  'use strict';
  var bitcoin = require('../bitcoin');
  describe('Bitcoin 1', function() {
    var hash = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f';
    var fetched;
    beforeEach(function(done) {
      bitcoin.fetch(hash).then(function(block) {
        fetched = block;
        done();
      });
    });

    it('should fetch a block', function() {
      check(
        fetched,
        '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
        376973,
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

  describe('Bitcoin 2', function() {
    var hash = '00000000000000000b9f55f5d0857f5655698e15996deb29bf56548268d45550';
    var fetched;
    beforeEach(function(done) {
      bitcoin.fetch(hash).then(function(block) {
        fetched = block;
        done();
      });
    });

    it('should fetch a different block', function() {
      check(
        fetched,
        '00000000000000000b9f55f5d0857f5655698e15996deb29bf56548268d45550',
        2117,
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

  describe('Bitcoin 3', function() {
    it('verifies the genesis block\'s hash', function() {
      var block = createBlock(
        1,
        undefined,
        '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
        1231006505,
        '1d00ffff',
        2083236893,
        '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f');

      expect(bitcoin.verify(block)).toEqual(true);
    });

    it('verifies the an arbitrary block\'s hash', function() {
      var block = createBlock(
        1,
        '00000000000008a3a41b85b8b29ad444def299fee21793cd8b9e567eab02cd81',
        '51d37bdd871c9e1f4d5541be67a6ab625e32028744d7d4609d0c37747b40cd2d","60c25dda8d41f8d3d7d5c6249e2ea1b05a25bf7ae2ad6d904b512b31f997e1a1","01f314cdd8566d3e5dbdd97de2d9fbfbfd6873e916a00d48758282cbb81a45b9","b519286a1040da6ad83c783eb2872659eaf57b1bec088e614776ffe7dc8f6d01',
        1305998791,
        '1a44b9f2',
        2504433986,
        '00000000000000001e8d6829a8a21adc5d38d0a473b144b6765798e61f98bd1d');

      expect(bitcoin.verify(block)).toEqual(true);
    });
  });

  function createBlock(version, previousHash, txs, time, bits, nonce, expectedHash) {
    var hash = createStringElement('hash', expectedHash);
    var v = createStringElement('version', version);
    var prevHash = previousHash === undefined ? '' : createStringElement('previousblockhash', previousHash);
    var transactions = '"tx":["' + txs + '"],';
    var t = createNumericElement('time', time);
    var n = createNumericElement('nonce', nonce);
    var b = createStringElement('bits', bits);

    var block = '{' + hash + v + transactions + prevHash + t + n + b.substr(0, b.length - 1) + '}';

    return JSON.parse(block);
  }

  function createStringElement(elementName, element) {
    return '"' + elementName + '"' + ':"' + element + '",';
  }

  function createNumericElement(elementName, element) {
    return '"' + elementName + '"' + ':' + element + ',';
  }

  function check(block, hash, conf, size, height, v, mr, tx, t, n, b, d, ch, nbh, imc, pbh) {
    expect(block.hash).toEqual(hash);
    //expect(block.confirmations).toEqual(conf); // this is dynamic, so might change
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
  }
})();