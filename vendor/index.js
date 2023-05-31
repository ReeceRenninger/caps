'use strict';

const { orderHandler, deliveredMessage }= require('./handler');

const newOrderHandler = (payload) => {
  setTimeout(() => {

    orderHandler(payload);
  }, 3000);
};

// invoking newOrderHandler function for order to be generated

const deliveredHandler = (payload) => {
  setTimeout(() => {
    
    deliveredMessage(payload);
  }, 500);
};


module.exports = { newOrderHandler, deliveredHandler };

