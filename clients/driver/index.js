'use strict';


//bring io in at index level for each driver and vendor
const { io } =  require('socket.io-client');
const socket =  io('http://localhost:3001/caps');
const { handlePickupAndDelivered } = require('./handler');

//.ons listening to emit 'pickup' that triggers the function(s) handlePickupAndDelivery
socket.on('pickup', handlePickupAndDelivered); 

//!! Not needed but wanted to test room join functionality
let store = '1-206-flowers';
socket.emit('JOIN', store);

