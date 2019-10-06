"use strict";
// VeriBlock Blockchain Project
// Copyright 2017-2018 VeriBlock, Inc
// Copyright 2018-2019 Xenios SEZC
// Copyright 2019 Tadeas Kmenta
// All rights reserved.
// https://www.veriblock.org
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
const address = require("./address");
const util = require("./util");
const zeltrezcrypto = require("../crypto");
const crypto = require("./crypto");
const amount = require("./amount");
class Transaction {
    constructor(type, sourceAddress, sourceAmount, outputs, networkByte) {
        this.type = type;
        this.outputs = outputs;
        this.networkByte = networkByte;
        // check address
        this.address = address.addressLikeToAddress(sourceAddress);
        // check amount
        this.amount = amount.amountLikeToAmount(sourceAmount);
    }
    get sourceAddress() {
        return this.address;
    }
    get sourceAmount() {
        return this.amount;
    }
}
exports.Transaction = Transaction;
exports.getTransactionId = (tx, signatureIndex) => {
    const ser = util.serializeTransactionEffects(tx, signatureIndex);
    return Buffer.from(zeltrezcrypto.sha256(Buffer.from(ser)), "hex");
};
class SignedTransaction {
    constructor(signature, publicKey, signatureIndex, transaction) {
        this.signature = signature;
        this.publicKey = publicKey;
        this.signatureIndex = signatureIndex;
        this.transaction = transaction;
    }
}
exports.SignedTransaction = SignedTransaction;
exports.signTransaction = (tx, keyPair, signatureIndex) => {
    const id = exports.getTransactionId(tx, signatureIndex);
    const sig = crypto.SHA256withECDSA.sign(id, keyPair);
    return new SignedTransaction(sig, keyPair.publicKey, signatureIndex, tx);
};