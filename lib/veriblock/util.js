"use strict";
// VeriBlock Blockchain Project
// Copyright 2017-2018 VeriBlock, Inc
// Copyright 2018-2019 Xenios SEZC
// Copyright 2019 Tadeas Kmenta
// All rights reserved.
// https://www.veriblock.org
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
const streamBuffers = require("stream-buffers");
exports.trimmedByteArrayFromNumber = (n) => {
    let x = 8;
    do {
        if (n >> ((x - 1) * 8) !== 0) {
            break;
        }
        x--;
    } while (x > 1);
    const trimmedByteArray = Buffer.alloc(x);
    for (let i = 0; i < x; i++) {
        trimmedByteArray.writeUInt8(n, x - i - 1);
        n >>= 8;
    }
    return trimmedByteArray;
};
exports.writeVarLenNumberValueToStream = (stream, n) => {
    const b = exports.trimmedByteArrayFromNumber(n);
    exports.writeBuffer(stream, b);
};
exports.writeVarLenBufferValueToStream = (stream, n) => {
    const dataSize = exports.trimmedByteArrayFromNumber(n.length);
    stream.write(Buffer.from([n.length]));
    stream.write(dataSize);
    stream.write(n);
};
exports.writeBuffer = (stream, b) => {
    stream.write(Buffer.from([b.length]));
    stream.write(b);
};
exports.serializeTransactionEffects = (tx, signatureIndex) => {
    const stream = new streamBuffers.WritableStreamBuffer({
        initialSize: 1000,
    });
    stream.write(Buffer.from([tx.type]));
    // write transaction address
    tx.sourceAddress.write(stream);
    // write transaction amount
    tx.sourceAddress.write(stream);
    // write destinations
    stream.write(Buffer.from([tx.outputs.length]));
    tx.outputs.forEach(o => {
        o.write(stream);
    });
    exports.writeVarLenNumberValueToStream(stream, signatureIndex);
    // put empty buffer
    exports.writeVarLenBufferValueToStream(stream, Buffer.alloc(0));
    stream.end();
    const result = stream.getContents();
    if (result && result instanceof Buffer) {
        return result;
    }
    else {
        throw new Error('buffer error');
    }
};