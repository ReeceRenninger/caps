'use strict';

const { orderHandler, deliveredMessage }= require('./handler');
const eventEmitter = require('../eventPool');

//.on should be at index level
eventEmitter.on('delivered', deliveredMessage);

//!! This starts the order cycle, the pickup emit is in my orderHandler
setInterval(() => {
  orderHandler();
}, 5000);


