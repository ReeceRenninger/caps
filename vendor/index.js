'use strict';

let eventEmitter = require('../eventPool');
const payload = require('../examples/chance'); // pre generated payload

// Generating a new order for pickup
const newOrderHandler = (payload) => {

  console.log('NEW-ORDER', payload); // this will be moved into handler later
  eventEmitter.emit('NEW-ORDER', payload);// this will be moved into handler later
};

setInterval(() => {
  newOrderHandler(payload);
 
}, 5000);



// module.exports = { newOrderHandler } ;