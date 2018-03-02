const app = require('./app');
const http = require('http');

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = require('socket.io').listen(server);

// const sensorLib = require('raspi-sensors');
const refreshTimeInSec = 5;

// let BMP180 = new sensorLib.Sensor({
//   type: 'BMP180',
//   address: 0x77
// }, 'temp_pressure_sensor');

// let DHT22 = new sensorLib.Sensor({
//   type: 'DHT22',
//   pin: 0X7
// }, 'temp_humidity_sensor');

// let TSL2561 = new sensorLib.Sensor({
//   type: 'TSL2561',
//   address: 0X39
// }, 'light_sensor');

// Define a callback
let cb = (err, data) => {
  if (err) {
    console.error("An error occured!");
    console.error(err.cause);
    return;
  }

  console.log(data);
  sendToClient(data);
}

// BMP180.fetchInterval(cb, refreshTimeInSec);
// DHT22.fetchInterval(cb, refreshTimeInSec);
// TSL2561.fetchInterval(cb, refreshTimeInSec);

let jsonObj = {
  type: 'Light',                                    // The type of the value of the sensor
  unit: 'Lux',                                      // The unit used
  unit_display: 'Lux',                              // The displayable unit
  value: 819,                                       // The raw value, exprimed in the specified unit
  date: 'Sun Feb 14 2016 15:22:00 GMT+0000 (UTC)',  // The js date of the fetch
  timestamp: 1455463320449,                         // The timestamp of the previous date
  sensor_name: 'light_sensor',                      // The name of the sensor (so you can use the same callback for multiple sensors)
  sensor_type: 'BMP180'                            // The type of the sensor
};

setInterval(() => {
  sendToClient(jsonObj);
}, refreshTimeInSec * 1000);

function sendToClient(data) {
  let sensorModel = data.sensor_type;
  io.sockets.emit(sensorModel, data);
}

server.listen(port);