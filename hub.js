'use strict';

const eventPool = require('./eventPool');

require('./vendor/index');
require('./driver/index');

//build out timestamp at each iteration of the delivery process
eventPool.on('pickup', (payload) => logger('pickup', payload));
eventPool.on('in-transit', (payload) => logger('in-transit', payload));
eventPool.on('delivered', (payload) => logger('delivered', payload));

//logger function from live demo
function logger(event, payload){
  const timestamp = new Date();
  console.log('EVENT: ', { event, timestamp, payload });
}