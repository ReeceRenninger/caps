'use strict';

let eventEmitter = require('../eventPool');

const driverHandler = (payload) => {
  setTimeout(() => {
    console.log('Driver is on his way to pickup: ', payload);
    
  }, 2000);
};

eventEmitter.on('NEW-ORDER', driverHandler); // driver handler is LISTENING FOR NEW-ORDER FROM VENDOR 

module.exports = driverHandler;