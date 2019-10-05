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
const chopChecksumStandard = (checksum) => {
    if (checksum.length < constants.ADDRESS_CHECKSUM_LENGTH) {
        throw "Checksum length is lower than its suppose to be" 
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
