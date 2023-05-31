'use strict';


// const { newOrderHandler } = require('./vendor/index');
// const payload = require('./vendor/chance');
const eventPool = require('./eventPool');

require('./vendor/index');
require('./driver/index');

//function logger in the future
//build out timestamp at each iteration of the delivery process
//TODO: Get the set timeouts working again to allow the timestamp to trigger at EACH event iteration 
eventPool.on('pickup', (payload) => logger('pickup', payload));
eventPool.on('in-transit', (payload) => logger('in-transit', payload));
eventPool.on('delivered', (payload) => logger('delivered', payload));


//logger function from live demo

function logger(event, payload){
  const timestamp = new Date();
  console.log('EVENT: ', { event, timestamp, payload });
}