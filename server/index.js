'use strict';
// cheat sheet for socket connection https://socket.io/docs/v3/emit-cheatsheet/
// server.emit sends to all clients connected to server
//socket.broadcast.emit sends to all clients in current namespace except sender.
// become the new hub? based off the file structure for lab.

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;

//create socket singleton
const server = new Server();

//listening for all events at port 3001
server.listen(PORT);
// allows for clients to connect directly to server
server.on('connection', (socket) => {
  console.log('socket connection to event server: ', socket.id);

  //socket.on('looking for this message', (payload) => {
  // console.log('SERVER: Message event', payload);
  //})
});

//namespace example
const caps = server.of('./caps');
// connecting to caps namespace
caps.on('connection', (socket) => {
  console.log('socket connection to server: ', socket.id);

  //how to join a room
  socket.on('JOIN', (room) => {

    socket.join(room);
    console.log(`You have joined ${room} room, welcome!`);

  });
  
});
//example to emit to room
// socket.to(room).emit('some event', some-payload);