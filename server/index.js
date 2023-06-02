'use strict';
// cheat sheet for socket connection https://socket.io/docs/v3/emit-cheatsheet/

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
// pulling in queue and creating eventQueue
const Queue = require('./lib/queue');
let eventQueue = new Queue();
// create socket singleton
const server = new Server();
// namespace creation
const caps = server.of('/caps');

// connecting to caps namespace
caps.on('connection', (socket) => {
  console.log('Caps socket connection to server: ', socket.id);

  //how to join a room
  socket.on('JOIN', (room) => {
    console.log('Possible rooms -----', socket.adapter.rooms);
    console.log('Payload is in this room ----', room);
    socket.join(room);
  });

  //different approach to logger 
  socket.onAny((event, payload) => {
    const timestamp = new Date();
    console.log('EVENT: ', { event, timestamp, payload });
  });

  socket.on('pickup', (payload) => {
    //looking for 'DRIVER' in emit to get all messages
    let currentQueue = eventQueue.read('DRIVER');
    //server on run wont know que so we need validation
    if (!currentQueue) {
      let queueKey = eventQueue.store('DRIVER', new Queue());// generates a new que with 'DRIVER' 
      currentQueue = eventQueue.read(queueKey);
    }
    // now that we KNOW we have a currentQueue lets STORE the incoming message
    // we know the unique ORDERID from payload.
    currentQueue.store(payload.orderID, payload);
    // console.log('console log in the pickup socket.on at server', currentQueue); //testing if currentQueue is storing properly

    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {

    caps.emit('in-transit', payload); //!! had to switch to caps.emit message was NOT GOING OUT with broadcast or normal socket
  });

  socket.on('delivered', (payload) => {
    let currentQueue = eventQueue.read(payload.store);
    if (!currentQueue) {
      let queueKey = eventQueue.store(payload.store, new Queue());
      currentQueue = eventQueue.read(queueKey);
    }

    currentQueue.store(payload.orderID, payload);
    console.log('console log in the delivered socket.on at server', currentQueue); // testing currentQueue at delivered status

    caps.emit('delivered', payload); //!! had to switch to caps.emit message was NOT GOING OUT with broadcast or normal socket
  });

  //payload was successfully read should include client id, event name, and order id so you can DELETE IT from queue
  socket.on('received', (payload) => {
    //id will equal payload.queueId if it exits otherwise use payload.store
    let id = payload.queueId ? payload.queueId : payload.store;
    let currentQueue = eventQueue.read(id);
    if (!currentQueue) {
      throw new Error('No queue found for this store:', payload.store);
    }

    let order = currentQueue.remove(payload.orderID);
    // console.log('this log is from within the received socket.on on server', currentQueue); // testing funcitonality
    socket.emit('received', order);
  });

  //TODO: get clarification this works somehow
  socket.on('getAll', (payload) => {
    console.log('attempting to get all orders');
    // sending to the correct room or using the payload.queueId
    let id = payload.queueId ? payload.queueId : payload.store;
    let currentQueue = eventQueue.read(id);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach(orderID => {
        // sending saved messages that were missed by recipient
        //Ryan emitted MESSAGES which is equivalent to our pickup? 
        //I think since the drivers will be grabbing all generated pickup orders from vendor while they are offline.
        socket.emit('pickup', currentQueue.read(orderID));
      });
    }
  });


});

//listening for all events at port 3001
server.listen(PORT);
