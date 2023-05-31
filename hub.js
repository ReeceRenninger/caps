'use strict';


const { newOrderHandler } = require('./vendor/index');
const payload = require('./examples/chance');
const eventPool = require('./eventPool');

require('./vendor/index');
require('./driver/index');

//invokes new order from vendor file to begin order process
newOrderHandler(payload); 

//function logger in the future
//build out timestamp at each iteration of the delivery process
//TODO: Get the set timeouts working again to allow the timestamp to trigger at EACH event iteration 
eventPool.on('event', (event, payload) => {
  let timestamp = new Date();
  console.log(`EVENT: { event: '${event}, time: ${timestamp}, payload:${JSON.stringify(payload)}}`);
});