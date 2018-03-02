const socket = io('ws://localhost:3000');

socket.on('BMP180', (data) => {
  console.log(data);
});

socket.on('DHT22', (data) => {
  console.log(data);
});

socket.on('TSL2561', (data) => {
  console.log(data);
});