'use strict';

/*
config.js - Configuration for VEIL until we rewrite it in store/index.js for pubkeyhash to be variable
*/

module.exports = {
  mainnet: {
    messagePrefix: 'Veil main net',
    bip32: {
      public: '0488b21e',
      private: '0488ade4'
    },
    pubKeyHash: '46',
    scriptHash: '5',
    zcPaymentAddressHash: '169a', //not in veil
    zcSpendingKeyHash: 'ab36', //not in veil
    wif: '80'
  },
  testnet: {
    wif: 'ef',
    pubKeyHash: '6f',
    scriptHash: 'c4',
    messagePrefix: 'Veil testnet',
    bip32: {
      public: '043587cf',
      private: '04358394'
    },
    zcPaymentAddressHash: '16b6', //not in veil
    zcSpendingKeyHash: 'ac08' //not in veil
  }
};