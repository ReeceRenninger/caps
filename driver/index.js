'use strict';

// const { pickupOccurred, packageDelivered } = require('./handler');
const eventEmitter = require('../eventPool');
const { handlePickupAndDelivery } = require('./handler');
//.ons
eventEmitter.on('pickup', handlePickupAndDelivery); 
// eventEmitter.on('in-transit', handlePickupAndDelivery);

// const pickupHandler = (payload) => {
//   setTimeout(() => {

//     pickupOccurred(payload);
//   }, 1000);
// };


// const deliveryHandler = (payload) => {
//   setTimeout(() => {

//     packageDelivered(payload);
//   }, 1000);
// };


// module.exports = { pickupHandler, deliveryHandler};