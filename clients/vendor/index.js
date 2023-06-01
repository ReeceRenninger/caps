'use strict';

const { orderHandler, deliveredMessage } = require('./handler');

//bring io in at index level for each driver and vendor
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

//.on should be at index level
socket.on('delivered', deliveredMessage);

//!! Not needed but wanted to test room join functionality
let store = '1-206-flowers';
socket.emit('JOIN', store);

//!! Generates order cycle for pickup after 5 seconds
setInterval(() => {
  orderHandler();
}, 5000);


