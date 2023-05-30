'use strict';

let eventEmitter = require('../eventPool');
const payload = require('../examples/chance'); // pre generated payload

// Generating a new order for pickup
const vendorHandler = (payload) => {
  setInterval(() => {
    console.log('---------------New Order Starts Here------------------');
    let newOrder = payload;

    console.log('NEW-ORDER', newOrder); // this will be moved into handler later
    eventEmitter.emit('NEW-ORDER', newOrder);// this will be moved into handler later
  }, 3000);
};



module.exports = vendorHandler;