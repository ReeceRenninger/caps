'use strict';

let eventEmitter = require('../eventPool');

const pickupHandler = (payload) => {
  setTimeout(() => {

    console.log('DRIVER: picked up', payload.orderId);
    eventEmitter.emit('in-transit', payload);
  }, 1000);
};

eventEmitter.on('pickup', pickupHandler); // move all .ons to handler once I figure out if they are working.

const deliveryHandler = (payload) => {
  setTimeout(() => {

    console.log('DRIVER: delivered', payload.orderId);
    eventEmitter.emit('delivered', payload);
  }, 1000);
};

eventEmitter.on('in-transit', deliveryHandler);


module.exports = { pickupHandler, deliveryHandler};