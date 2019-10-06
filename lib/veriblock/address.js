"use strict";
// VeriBlock Blockchain Project
// Copyright 2017-2018 VeriBlock, Inc
// Copyright 2018-2019 Xenios SEZC
// Copyright 2019 Tadeas Kmenta
// All rights reserved.
// https://www.veriblock.org
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
const crypto = require("./crypto");
const constants = require("./const");
const zeltrezcrypto = require("../crypto");
const bs58 = require('bs58');
const util = require('./util');
const getDataPortionFromAddress = (address) => {
    return address.substr(constants.ADDRESS_DATA_START, constants.ADDRESS_DATA_END + 1);
};
const getChecksumPortionFromAddress = (address) => {
    return address.substr(constants.ADDRESS_CHECKSUM_START);
};
const chopChecksumStandard = (checksum) => {
    if (checksum.length < constants.ADDRESS_CHECKSUM_LENGTH) {
        throw "Checksum length is lower than its supposed to be"
    }
    return checksum.substr(0, constants.ADDRESS_CHECKSUM_LENGTH + 1);
};
exports.addressFromPublicKey = (publicKey) => {
    if (publicKey instanceof Buffer) {
        publicKey = new crypto.PublicKey(publicKey);
    }
    const b58 = bs58.encode(Buffer.from(zeltrezcrypto.sha256(publicKey.asn1), "hex"));
    const slice = b58.slice(constants.ADDRESS_DATA_START, constants.ADDRESS_DATA_END);
    const address = constants.STARTING_CHAR + slice;
    const checksum = chopChecksumStandard(bs58.encode(Buffer.from(zeltrezcrypto.sha256(Buffer.from(address)), "hex")));
    return address + checksum;
};
exports.isValidStandardAddress = (address) => {
    if (!address) {
        return false;
    }
    if (address.length !== constants.ADDRESS_LENGTH) {
        return false;
    }
    if (address[0] !== constants.STARTING_CHAR) {
        return false;
    }
    const sub = getDataPortionFromAddress(address);
    const hash = Buffer.from(zeltrezcrypto.sha256(Buffer.from(sub)), "hex");
    const b58 = bs58.encode(hash);
    return chopChecksumStandard(b58) === getChecksumPortionFromAddress(address);
};
class Address {
    constructor(value) {
        this.value = value;
        if (exports.isValidStandardAddress(value)) {
            this.type = 1;
            return;
        }
        throw new Error('invalid address');
    }
    static fromPublicKey(publicKey) {
        if (publicKey instanceof Buffer) {
            publicKey = new crypto.PublicKey(publicKey);
        }
        return new Address(publicKey.address);
    }
    write(b) {
        b.write(Buffer.from([constants.STANDARD_ADDRESS_ID]));
        const bytes = bs58.decode(this.value);
        util.writeBuffer(b, bytes);
    }
}
exports.Address = Address;
exports.addressLikeToAddress = (addressLike) => {
    if (addressLike instanceof Address) {
        return addressLike;
    }
    else {
        return new Address(addressLike);
    }
};
