const app = require('./app');
const http = require('http');

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = require('socket.io').listen(server);

// const sensorLib = require('raspi-sensors');
const refreshTimeInSec = 1;

// let DHT22 = new sensorLib.Sensor({
//   type: 'DHT22',
//   pin: 0X7
// }, 'temp_humidity_sensor');

// let BMP180 = new sensorLib.Sensor({
//   type: 'BMP180',
//   address: 0x77
// }, 'pressure_sensor');

// let TSL2561 = new sensorLib.Sensor({
//   type: 'TSL2561',
//   address: 0X39
// }, 'light_sensor');


// DHT22.fetchInterval(function (err, data) {
//   if (err) {
//     console.error('An error occured: ', err.cause);
//     return;
//   }

//   if (data.type === 'Temperature') {
//     io.sockets.emit('dht22_temperature', data);
//   } else {
//     io.sockets.emit('dht22_humidity', data);
//   }
// }, refreshTimeInSec);

// BMP180.fetchInterval(function (err, data) {
//   if (err) {
//     console.error('An error occured: ', err.cause);
//     return;
//   }

//   if (data.type === 'Pressure') {
//     io.sockets.emit('bmp180_pressure', data);
//   }
// }, refreshTimeInSec);

// TSL2561.fetchInterval(function (err, data) {
//   if (err) {
//     console.error('An error occured: ', err.cause);
//     return;
//   }

//   io.sockets.emit('tsl2561_light', data);
// }, refreshTimeInSec);


let lightData = {
  type: 'Light',
  unit: 'Lux',
  unit_display: 'Lux',
  value: 43,
  date: "2018 - 03 - 03T21: 24: 01.076Z",
  timestamp: 1520112241076,
  sensor_name: 'light_sensor',
  sensor_type: 'TSL2561'
};

let pressureData = {
  type: 'Pressure',
  unit: 'Pascal',
  unit_display: 'Pa',
  value: 101086,
  date: "2018 - 03 - 03T21: 24: 01.096Z",
  timestamp: 1520112241096,
  sensor_name: 'pressure_sensor',
  sensor_type: 'BMP180'
};

setInterval(function () {
  io.sockets.emit('bmp180_pressure', pressureData);
  io.sockets.emit('tsl2561_light', lightData);
}, 3000);

server.listen(port);

// Code for getting local IP
let address,
  ifaces = require('os').networkInterfaces();
for (let dev in ifaces) {
  ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address : undefined);
}

console.log('The server is running on: http://' + address + ':' + port);