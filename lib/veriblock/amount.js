"use strict";
// VeriBlock Blockchain Project
// Copyright 2017-2018 VeriBlock, Inc
// Copyright 2018-2019 Xenios SEZC
// Copyright 2019 Tadeas Kmenta
// All rights reserved.
// https://www.veriblock.org
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
const util = require("./util");
class Amount {
    constructor(value) {
        this.value = value;
    }
    write(b) {
        util.writeVarLenNumberValueToStream(b, this.value);
    }
}
exports.Amount = Amount;
exports.amountLikeToAmount = (amountLike) => {
    if (amountLike instanceof Amount) {
        return amountLike;
    }
    else {
        return new Amount(amountLike);
    }
};