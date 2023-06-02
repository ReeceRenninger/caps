'use strict';

//bring io in at index level for each driver and vendor
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');
const { createOrder , packageDelivered } = require('./handler');

// does this need to be at the top to get ran first?

socket.emit('getAll', {store: 'acme-widgets'});

//!! Generates order cycle for pickup after 8 seconds to prevent overlap with flower vendor order creation at 5 seconds
setInterval(() => {
  createOrder(socket);
}, 8000);


//triggers the packageDelivered thank you message on from handler, emits received to be caught by server
socket.on('delivered', (payload) => {
  packageDelivered(payload);
  socket.emit('received', payload); // this is to delete the order from queue as it is picked up? I think
});