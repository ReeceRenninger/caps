'use strict';

var Chance = require('chance');
var chance = new Chance();

//used lab build out and modified this to fit widget vendor needed for lab 13
const createOrder = (socket, payload = null) => {
  if(!payload){
    payload = {
      store: 'acme-widgets',
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };

  }
  //Join room specific to store name
  socket.emit('JOIN', payload.store);
  console.log(`VENDOR: Order #:${payload.orderID} ready for pickup.`);
  socket.emit('pickup', payload);

};
//vendor thank you message once it receives the delivered 
const packageDelivered = (payload) => {
  console.log(`VENDOR: Thank you for your order ${payload.customer}`);
  
};

module.exports = { createOrder, packageDelivered }; 