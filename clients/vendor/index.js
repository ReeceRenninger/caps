'use strict';

const { orderHandler, deliveredMessage }= require('./handler');
const eventEmitter = require('../../eventPool');

//bring io in at index level for each driver and vendor
const { io } =  require('socket.io-client');
const socket =  io('http://localhost:3001/caps');

//.on should be at index level
eventEmitter.on('delivered', deliveredMessage);

//!! This starts the order cycle, the pickup emit is in my orderHandler
setInterval(() => {
  orderHandler();
}, 5000);


