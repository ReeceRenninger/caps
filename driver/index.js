'use strict';

const { pickupOccurred, packageDelivered } = require('./handler');

const pickupHandler = (payload) => {
  setTimeout(() => {

    pickupOccurred(payload);
  }, 1000);
};


const deliveryHandler = (payload) => {
  setTimeout(() => {

    packageDelivered(payload);
  }, 1000);
};


module.exports = { pickupHandler, deliveryHandler};