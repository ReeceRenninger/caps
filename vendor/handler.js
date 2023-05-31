'use strict';

const eventEmitter = require('../eventPool');

const orderHandler = (payload) => {
  console.log('VENDOR ORDER:', payload); // this will be moved into handler later
  eventEmitter.emit('pickup', payload); // this will be moved into handler later
};

const deliveredMessage = (payload) => {
  console.log('VENDOR: Thank you for your order', payload.customer);
};

eventEmitter.on('delivered', deliveredMessage);

module.exports = { orderHandler, deliveredMessage };