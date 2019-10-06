"use strict";
// VeriBlock Blockchain Project
// Copyright 2017-2018 VeriBlock, Inc
// Copyright 2018-2019 Xenios SEZC
// Copyright 2019 Tadeas Kmenta
// All rights reserved.
// https://www.veriblock.org
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
const addr = require("./address");
const amnt = require("./amount");
class Output {
    constructor(address, amount) {
        this.address = addr.addressLikeToAddress(address);
        this.amount = amnt.amountLikeToAmount(amount);
    }
    write(b) {
        this.address.write(b);
        this.amount.write(b);
    }
}
exports.Output = Output;