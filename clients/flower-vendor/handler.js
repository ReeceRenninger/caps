'use strict';

const { io } =  require('socket.io-client');
const socket =  io('http://localhost:3001/caps');
var Chance = require('chance');
var chance = new Chance();

//Begins the order process with setInterval on index level.
const orderCreator = (payload=null) => {
  if(!payload){
    payload = {
      store: '1-800-flowers',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }

  socket.emit('pickup', payload);
};

// testable code for deliveredMessage
const thankDriver = (payload) =>
  console.log('VENDOR: Thank you for your order', payload.customer);

const deliveredMessage = (payload) => {
  setTimeout(() => {
    thankDriver(payload);
  }, 1000);
};

module.exports = { orderCreator, deliveredMessage, thankDriver };