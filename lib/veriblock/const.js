"use strict";
// VeriBlock Blockchain Project
// Copyright 2017-2018 VeriBlock, Inc
// Copyright 2018-2019 Xenios SEZC
// Copyright 2019 Tadeas Kmenta
// All rights reserved.
// https://www.veriblock.org
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
exports.ADDRESS_LENGTH = 30;
exports.MULTISIG_ADDRESS_LENGTH = 30;
exports.ADDRESS_DATA_START = 0;
exports.ADDRESS_DATA_END = 24;
exports.MULTISIG_ADDRESS_DATA_START = 0;
exports.MULTISIG_ADDRESS_DATA_END = 24;
exports.ADDRESS_CHECKSUM_START = 25;
exports.ADDRESS_CHECKSUM_END = 29;
exports.ADDRESS_CHECKSUM_LENGTH = exports.ADDRESS_CHECKSUM_END - exports.ADDRESS_CHECKSUM_START;
exports.MULTISIG_ADDRESS_CHECKSUM_START = 25;
exports.MULTISIG_ADDRESS_CHECKSUM_END = 28;
exports.MULTISIG_ADDRESS_CHECKSUM_LENGTH = exports.MULTISIG_ADDRESS_CHECKSUM_END - exports.MULTISIG_ADDRESS_CHECKSUM_START;
exports.MULTISIG_ADDRESS_M_VALUE = 1;
exports.MULTISIG_ADDRESS_N_VALUE = 2;
exports.MULTISIG_ADDRESS_MIN_M_VALUE = 1;
exports.MULTISIG_ADDRESS_MIN_N_VALUE = 2;
exports.MULTISIG_ADDRESS_MAX_M_VALUE = 58;
exports.MULTISIG_ADDRESS_MAX_N_VALUE = 58;
exports.MULTISIG_ADDRESS_SIGNING_GROUP_START = 3;
exports.MULTISIG_ADDRESS_SIGNING_GROUP_END = 24;
exports.MULTISIG_ADDRESS_SIGNING_GROUP_LENGTH = exports.MULTISIG_ADDRESS_SIGNING_GROUP_END - exports.MULTISIG_ADDRESS_SIGNING_GROUP_START;
exports.MULTISIG_ADDRESS_IDENTIFIER_INDEX = 30;
/* The starting character makes addresses easy for humans to recognize. 'V' for VeriBlock. */
exports.STARTING_CHAR = 'V';
/* '0' for multisig as '0' is not part of the Base-58 alphabet */
exports.ENDING_CHAR_MULTISIG = '0';
exports.VBLAKE_HASH_OUTPUT_SIZE_BYTES = 24;
exports.STANDARD_ADDRESS_ID = 0x01;
exports.MULTISIG_ADDRESS_ID = 0x03;
exports.STANDARD_TRANSACTION_ID = 0x01;
exports.MULTISIG_TRANSACTION_ID = 0x03;
//# sourceMappingURL=const.js.map