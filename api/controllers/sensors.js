const sensorLib = require('raspi-sensors');

// Lists all sensors
exports.listSensors = (req, res, next) => {
  res.status(200).json({
    links: {
      index: {
        href: process.env.DOMAIN + 'api',
        method: 'GET',
        desc: 'Main entry point. Overview of routes.'
      },
      self: {
        href: process.env.DOMAIN + 'api/sensors',
        method: 'GET',
        desc: 'Route for listing all sensors.'
      },
      temperature: {
        href: process.env.DOMAIN + 'api/sensors/temperature',
        method: 'GET',
        desc: 'Route for getting current value from the temperature sensor.'
      },
      humidity: {
        href: process.env.DOMAIN + 'api/sensors/humidity',
        method: 'GET',
        desc: 'Route for getting current value from the humidity sensor.'
      },
      pressure: {
        href: process.env.DOMAIN + 'api/sensors/pressure',
        method: 'GET',
        desc: 'Route for getting current value from the pressure sensor.'
      },
      brightness: {
        href: process.env.DOMAIN + 'api/sensors/brightness',
        method: 'GET',
        desc: 'Route for getting current value from the brightness sensor.'
      }
    }
  });
};

// Get value from temperature sensor
exports.getTemperature = (req, res, next) => {
  let DHT22 = new sensorLib.Sensor({
    type: 'DHT22',
    pin: 0X7
  }, 'temp_humidity_sensor');

  DHT22.fetch(function (err, data) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured!',
        error: err.cause
      }
    }

    if (data.type === 'Temperature') {
      console.log(data);
      res.status(200).json({
        links: {
          sensors: {
            href: process.env.DOMAIN + 'api/sensors',
            method: 'GET',
            desc: 'Route for listing all sensors.'
          },
          temperature: {
            temperature: data
          }
        }
      });
    } else {
    }
  });
};

// let BMP180 = new sensorLib.Sensor({
//   type: 'BMP180',
//   address: 0x77
// }, 'pressure_sensor');

// let TSL2561 = new sensorLib.Sensor({
//   type: 'TSL2561',
//   address: 0X39
// }, 'light_sensor');