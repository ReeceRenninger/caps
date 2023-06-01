'use strict';

const { io } = require('socket.io-client');

const socket = io.connect('http://localhost:3001/caps');

//attempts to get all stored messages with 'DRIVER' attached
socket.emit('getAll', { queueId: 'DRIVER' });

//modified handlers to just be listeners/ emits.
socket.on('pickup', (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    socket.emit('received', { queueId: 'DRIVER' });
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