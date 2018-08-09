$(document).ready(function() {
  var markers = [];
  var socket = io();
  var myLatLng = { lat: 24.7136, lng: 46.6753 };

  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 11
  });

  socket.on('connect', function() {
    console.log('connected to server');
  });

  socket.on('disconnect', function() {
    console.log('disconnected from server');
  });

  socket.on('updatedDriverLocationMessage', function(data) {
    deleteMarkers();
    addMarker(data);
  });

  function initMap() {
    new google.maps.Map(map);
  }

  function addMarker(data) {
    var coords = data.coords.split('&');
    var lat = coords[0].split('=')[1];
    var lng = coords[1].split('=')[1];

    console.log('latitude =', lat);
    console.log('longitude =', lng);

    var marker = new google.maps.Marker({
      map,
      position: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      },
      title: data.id
    });

    markers.push(marker);
  }

  function deleteMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
    markers = [];
  }
});
