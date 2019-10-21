var bs58check = require('bs58check');
var base58 = require('base-58');
var cryptoJS = require('crypto-js');
var sm = require('sm.js');
var elliptic = require('elliptic');

function decodeRaw (buffer, version) {
  // check version only if defined
  if (version !== undefined && buffer[0] !== version) throw new Error('Invalid network version')

  // uncompressed
  if (buffer.length === 33) {
    return {
      version: buffer[0],
      privateKey: buffer.slice(1, 33),
      compressed: false
    }
  }

  // invalid length
  if (buffer.length !== 34) throw new Error('Invalid WIF length')

  // invalid compression flag
  if (buffer[33] !== 0x01) throw new Error('Invalid compression flag')

  return {
    version: buffer[0],
    privateKey: buffer.slice(1, 33),
    compressed: true
  }
}

function decode (string, version) {
  return decodeRaw(bs58check.decode(string), version)
}

function ab2hexstring(arr) {
  let result = '';
  const uint8Arr = new Uint8Array(arr);
  for (let i = 0; i < uint8Arr.byteLength; i++) {
      let str = uint8Arr[i].toString(16);
      str = str.length === 0
          ? '00'
          : str.length === 1
              ? '0' + str
              : str;
      result += str;
  }
  return result;
}

function deserializeWIF(wifkey) {
  return ab2hexstring(decode(wifkey, 128).privateKey);
}

function createOntAccount(privateKey) {
  const account = {};
  const publicKey = getPublicKey(privateKey);
  const address = fromPubKey(publicKey);
  account.publicKey = publicKey;
  account.address = address;
  account.base58addr = toBase58(address);
  return account;
}

function fromPubKey(publicKey) {
  const program = programFromPubKey(publicKey);
  return hash160(program);
}

function programFromPubKey(pk) {
  let result = '';
  result += pushPubKey(pk);
  result += pushOpCode(172);
  return result;
}

function pushOpCode(op) {
  return num2hexstring(op);
}

function pushPubKey(pk) {
  return pushBytes(pk);
}

function pushBytes(hexstr) {
  let result = '';
  if (hexstr.length === 0) {
      throw new Error('pushBytes error, hexstr is empty.');
  }
  const len = hexstr.length / 2;
  if (len <= 75 + 1 - 1 ) {
      result += num2hexstring(len + 1 - 1);
  } else if (len < 0x100) {
      result += num2hexstring(1);
      result += num2hexstring(len);
  } else if (len < 0x10000) {
      result += num2hexstring(77);
      result += num2hexstring(len, 2, true);
  } else if (len < 0x100000000) {
      result += num2hexstring(78);
      result += num2hexstring(len, 4, true);
  } else {
      console.log("Error on pushBytes");
  }
  result += hexstr;
  return result;
}

function ripemd160(data) {
  const hex = cryptoJS.enc.Hex.parse(data);
  const ripemd = cryptoJS.RIPEMD160(hex).toString();
  return ripemd;
}

function hash160(SignatureScript) {
  return ripemd160(sha256(SignatureScript));
}

function sha256(data) {
  const hex = cryptoJS.enc.Hex.parse(data);
  const sha = cryptoJS.SHA256(hex).toString();
  return sha;
}

const num2hexstring = (num, size = 1, littleEndian = false) => {
  if (num < 0) {
      console.log('num must be >=0');
  }
  if (size % 1 !== 0) {
      console.log('size must be a whole integer');
  }
  if (!Number.isSafeInteger(num)) {
      console.log(`num (${num}) must be a safe integer`);
  }

  size = size * 2;
  let hexstring = num.toString(16);
  hexstring = hexstring.length % size === 0 ? hexstring : ('0'.repeat(size) + hexstring).substring(hexstring.length);
  if (littleEndian) {
      hexstring = reverseHex(hexstring);
  }
  return hexstring;
};

const reverseHex = (hex) => {
  if (hex.length % 2 !== 0) {
      console.log(`Incorrect Length: ${hex}`);
  }
  let out = '';
  for (let i = hex.length - 2; i >= 0; i -= 2) {
      out += hex.substr(i, 2);
  }
  return out;
};

function hexToBase58(hexEncoded) {
  const data = 17 + hexEncoded;

  const hash = sha256(data);
  const hash2 = sha256(hash);
  const checksum = hash2.slice(0, 8);

  const datas = data + checksum;

  return base58.encode(new Buffer(datas, 'hex'));
};

function toBase58(value) {
  if (value.length === 34) {
      return value;
  } else {
      return hexToBase58(value);
  }
};

// Uses ec p256 curve
function getPublicKey(key) {
  const ec = elliptic.ec("p256");
  const keyPair = ec.keyFromPrivate(key, 'hex');
  const pk = keyPair.getPublic(true, 'hex');

  return pk;
}

// Uses eddsa curve
function getPublicKey2(key) {
  const eddsa = elliptic.eddsa("ed25519");
  const keyPair = eddsa.keyFromSecret(key, 'hex');
  const pk = keyPair.getPublic(true, 'hex');

  return pk;
}

// Uses sm2 curve
function getPublicKey3(key) {
  const keyPair = sm.sm2.SM2KeyPair(null, key);
  const pk = keyPair.pubToString('compress');

  return pk;
}

module.exports = {
  deserializeWIF: deserializeWIF,
  createOntAccount: createOntAccount,
};