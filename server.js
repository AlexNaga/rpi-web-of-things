const app = require('./app');
const http = require('http');

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = require('socket.io').listen(server);

const sensorLib = require('raspi-sensors');
const refreshTimeInSec = 1;

let BMP180 = new sensorLib.Sensor({
  type: 'BMP180',
  address: 0x77
}, 'pressure_sensor');

let DHT22 = new sensorLib.Sensor({
  type: 'DHT22',
  pin: 0X7
}, 'temp_humidity_sensor');

let TSL2561 = new sensorLib.Sensor({
  type: 'TSL2561',
  address: 0X39
}, 'light_sensor');

// BMP180.fetchInterval(function (err, data) {
//   if (err) {
//     console.error("An error occured: ", err.cause);
//     return;
//   }

//   if (data.type === "Temperature") {
//     io.sockets.emit('bmp180_temp', data);
//   } else {
//     io.sockets.emit('bmp180_pressure', data);
//   }
// }, refreshTimeInSec);

// DHT22.fetchInterval(function (err, data) {
//   if (err) {
//     console.error("An error occured: ", err.cause);
//     return;
//   }
//   console.log(data);


//   let sensorModel = data.sensor_type;
//   io.sockets.emit('dht22_humidity', data);
// }, refreshTimeInSec);

// DHT22.fetchInterval(function (err, data) {
//   if (err) {
//     console.error("An error occured: ", err.cause);
//     return;
//   }

//   io.sockets.emit('dht22_humidity', data);
// }, refreshTimeInSec);

// TSL2561.fetchInterval(function (err, data) {
//   if (err) {
//     console.error("An error occured: ", err.cause);
//     return;
//   }

//   io.sockets.emit('tsl2561_light', data);
// }, refreshTimeInSec);

BMP180.fetch(function (err, data) {
  if (err) {
    console.error("An error occured: ", err.cause);
    return;
  }
  console.log(data);
});

server.listen(port);