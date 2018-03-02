const io = require('socket.io');
const sensorLib = require('raspi-sensors');
const refreshTimeInSec = 5;

exports.index = (req, res, next) => {
  let BMP180 = new sensorLib.Sensor({
    type: 'BMP180',
    address: 0x77
  }, 'temp_pressure_sensor');

  let DHT22 = new sensorLib.Sensor({
    type: 'DHT22',
    pin: 0X7
  }, 'temp_humidity_sensor');

  let TSL2561 = new sensorLib.Sensor({
    type: 'TSL2561',
    address: 0X39
  }, 'light_sensor');

  // Define a callback
  let cb = (err, data) => {
    if (err) {
      console.error("An error occured!");
      console.error(err.cause);
      return;
    }

    console.log(data);
    // sendToClient(data);
  }

  // BMP180.fetch(cb);
  // DHT22.fetch(cb);
  // TSL2561.fetch(cb);

  BMP180.fetchInterval(cb, refreshTimeInSec);

  function sendToClient(data) {
    socket.to(data.sensor_type).emit(data.type, data);
  }

  res.status(200).json({
    message: 'Hello!'
  });
};