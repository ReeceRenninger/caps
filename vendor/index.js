'use strict';

let eventEmitter = require('../eventPool');
const payload = require('../examples/chance'); // pre generated payload

// Generating a new order for pickup
const newOrderHandler = (payload) => {

  console.log('VENDOR ORDER:', payload); // this will be moved into handler later
  eventEmitter.emit('pickup', payload);// this will be moved into handler later
};

// invoking newOrderHandler function for order to be generated
setInterval(() => {
  newOrderHandler(payload);
 
}, 3000);

const deliveredHandler = (payload) => {
  setTimeout(() => {
    
    console.log('VENDOR: Thank you for your order', payload.customer);
  }, 500);
};

eventEmitter.on('delivered', deliveredHandler);


