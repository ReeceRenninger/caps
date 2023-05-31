'use strict';

const { orderHandler, deliveredMessage }= require('./handler');
const payload = require('./chance');
const eventEmitter = require('../../eventPool');

//.on should be at index level
eventEmitter.on('delivered', deliveredMessage);

//!! This starts the order cycle, the pickup emit is in my orderHandler
setInterval(() => {
  orderHandler(payload);
}, 5000);


