'use strict';

const eventEmitter = require('../eventPool');

const orderHandler = (payload) => {
  console.log('VENDOR ORDER:', payload);
  eventEmitter.emit('pickup', payload); 
  
};

const deliveredMessage = (payload) => {
  console.log('VENDOR: Thank you for your order', payload.customer);
  eventEmitter.emit('event', 'delivered', payload);
};

eventEmitter.on('delivered', deliveredMessage);

module.exports = { orderHandler, deliveredMessage };