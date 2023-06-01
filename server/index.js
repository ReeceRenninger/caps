'use strict';
//example to emit to room
// socket.to(room).emit('some event', some-payload);
// cheat sheet for socket connection https://socket.io/docs/v3/emit-cheatsheet/

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

//create socket singleton
const server = new Server();
//namespace creation
const caps = server.of('/caps');

function logger(event, payload){
  const timestamp = new Date();
  console.log('EVENT: ', { event, timestamp, payload });
}

// allows for clients to connect directly to server
server.on('connection', (socket) => {
  console.log('Server socket connection to event server: ', socket.id);

});

// connecting to caps namespace
caps.on('connection', (socket) => {
  console.log('Caps socket connection to server: ', socket.id);

  //how to join a room
  socket.on('JOIN', (room) => {
    console.log('Possible rooms -----', socket.adapter.rooms);
    console.log('Payload is in this room ----', room);
    socket.join(room);
  });

  socket.on('pickup', (payload) => {
    logger('pickup', payload);
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    logger('in-transit', payload);
    caps.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logger('delivered', payload);
    caps.emit('delivered', payload);
  });

});

//listening for all events at port 3001
server.listen(PORT);
