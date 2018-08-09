const express  = require('express');
const http     = require('http');
const socketIO = require('socket.io');
const path     = require('path');

const app    = express();
const server = http.createServer(app);
const io     = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

io.on('connection', socket => {
  console.log(`client ${socket.client.id} connected`);

  socket.on('disconnect', () => {
    console.log(`client ${socket.client.id} disconnected`);
  });

  socket.on('driverLocationMessage', coords => {
    io.emit('updatedDriverLocationMessage', {
      id: socket.client.id,
      coords
    });
  });
});

server.listen(3000, err => {
  if (err) return console.log(err);
  console.log('server running on port 3000');
});
