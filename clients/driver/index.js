'use strict';

const eventEmitter = require('../../eventPool');
const { handlePickupAndDelivered } = require('./handler');

//bring io in at index level for each driver and vendor
const { io } =  require('socket.io-client');
const socket =  io('http://localhost:3001/caps');

//.ons listening to emit 'pickup' that triggers the function handlePickupAndDelivery
eventEmitter.on('pickup', handlePickupAndDelivered); 


