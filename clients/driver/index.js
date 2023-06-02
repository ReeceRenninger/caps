'use strict';

const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');

// to get all stored messages for Drive in Queue
socket.emit('getAll', { queueId: 'DRIVER' });

//modified handlers to just be listeners/ emits.
socket.on('pickup', (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    socket.emit('received', { queueId: 'DRIVER' }); // this is to delete the order from queue as it is picked up? I think
    socket.emit('in-transit', payload);
  }, 1000);
});

socket.on('in-transit', (payload) => {
  
  setTimeout(() => {
    socket.emit('delivered', payload);
  }, 1000);
});

socket.on('delivered', (payload) => {
  
  console.log(`DRIVER: delivered ${payload.orderID}`);
});