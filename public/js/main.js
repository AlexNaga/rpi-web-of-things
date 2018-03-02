var socket = io();

console.log('Inside Main.js');

socket.on('BMP180', function (data) {
  console.log('Inside main.js socket');
  
  console.log(data);
});