'use strict';

let eventEmitter = require('../eventPool');

const pickupHandler = (payload) => {
  setTimeout(() => {
    console.log('Driver is on his way to pickup: ', payload);
    
  }, 3000);
};

eventEmitter.on('NEW-ORDER', pickupHandler); // driver handler is LISTENING FOR NEW-ORDER FROM VENDOR 

module.exports = pickupHandler;