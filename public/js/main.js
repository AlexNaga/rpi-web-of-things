var socket = io();

socket.on('BMP180', function (data) {
  console.log(data);
});