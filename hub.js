'use strict';

const eventEmitter = require('./eventPool');

const payload = require('./examples/chance'); // pregenerated examples 
// console.log(payload); // testing if chance payload was working.


require('./vendor/index');
//TODO: call handlers in here
const pickupHandler = require('./driver/index');



//TODO: listen to events in here
eventEmitter.on('NEW-ORDER', pickupHandler);