'use strict';

const { orderHandler, deliveredMessage }= require('./handler');
const payload = require('./chance');
const eventEmitter = require('../eventPool');

//on should be at index level
eventEmitter.on('delivered', deliveredMessage);

// const newOrderHandler = (payload) => {
//   setTimeout(() => {

    
//   }, 3000);
// };

setInterval(() => {
  orderHandler(payload);
}, 5000);

// const deliveredHandler = (payload) => {
//   setTimeout(() => {
    
//     deliveredMessage(payload);
//   }, 500);
// };


// module.exports = { deliveredHandler };

