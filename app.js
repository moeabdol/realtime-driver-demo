const express  = require('express');
const http     = require('http');
const socketIO = require('socket.io');

const app    = express();
const server = http.createServer(app);
const io     = socketIO(server);

io.on('connection', socket => {
  console.log('client connected');

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(3000, err => {
  if (err) return console.log(err);
  console.log('connected to server');
});
