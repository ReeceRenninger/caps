'use strict';

let eventEmitter = require('../eventPool');

const pickupOccurred = (payload) => {
  console.log('DRIVER: picked up', payload.orderId);
  eventEmitter.emit('in-transit', payload);
};

eventEmitter.on('pickup', pickupOccurred); // move all .ons to handler once I figure out if they are working.

const packageDelivered = (payload) => {
  console.log('DRIVER: delivered', payload.orderId);
  eventEmitter.emit('delivered', payload);
};

eventEmitter.on('in-transit', packageDelivered);

module.exports = { pickupOccurred, packageDelivered };