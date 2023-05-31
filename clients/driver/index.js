'use strict';

const eventEmitter = require('../../eventPool');
const { handlePickupAndDelivered } = require('./handler');

//.ons listening to emit 'pickup' that triggers the function handlePickupAndDelivery
eventEmitter.on('pickup', handlePickupAndDelivered); 
