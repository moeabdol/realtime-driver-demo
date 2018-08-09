$(document).ready(function() {
  var socket = io();

  socket.on('connect', function() {
    console.log('connected to server');
  });

  socket.on('disconnect', function() {
    console.log('disconnected from server');
  });

  socket.on('updatedDriverLocationMessage', function(coords) {
    coords = coords.split('&');
    var lat = coords[0].split('=')[1];
    var lng = coords[1].split('=')[1];

    console.log('latitude =', lat);
    console.log('longitude =', lng);
  });
});
