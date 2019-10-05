var zeltrezjs = require('..')
var chai = require('chai')
var expect = chai.expect

it('addressFromPublicKey() should be deterministic', function () {
  const pub = Buffer.from('03317b3fd39dd25719563f46534e6d9779695ef3b5b8886c2293fc79e0c5c32836', 'hex');
  var address = zeltrezjs.veriblockaddress.addressFromPublicKey(pub);
  expect(address).to.equal('VBZ3J16cLrhxeEwZvswQSucfrFKvMF');
})
