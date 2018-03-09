const sensorLib = require('raspi-sensors');

// Lists all available sensors
exports.getProperties = (req, res, next) => {
  res.status(200).json({
    links: {
      index: {
        href: process.env.DOMAIN + 'model',
        method: 'GET',
        desc: 'Route for listing metadata about this WoT.'
      },
      self: {
        href: process.env.DOMAIN + 'properties',
        method: 'GET',
        desc: 'Route for listing all properties.'
      },
      temperature: {
        href: process.env.DOMAIN + 'properties/temperature',
        method: 'GET',
        desc: 'Route for getting current value from the temperature sensor.'
      },
      humidity: {
        href: process.env.DOMAIN + 'properties/humidity',
        method: 'GET',
        desc: 'Route for getting current value from the humidity sensor.'
      },
      pressure: {
        href: process.env.DOMAIN + 'properties/pressure',
        method: 'GET',
        desc: 'Route for getting current value from the pressure sensor.'
      },
      brightness: {
        href: process.env.DOMAIN + 'properties/brightness',
        method: 'GET',
        desc: 'Route for getting current value from the brightness sensor.'
      }
    }
  });
};

// Get current value from the temperature sensor
exports.getTemperature = (req, res, next) => {
  let DHT22 = new sensorLib.Sensor({
    type: 'DHT22',
    pin: 0X7
  }, 'temperature_sensor');

  DHT22.fetch(function (err, data) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured!',
        error: err.cause
      });
    }

    if (data.type === 'Temperature') {
      res.status(200).json({
        links: {
          sensors: {
            href: process.env.DOMAIN + 'properties',
            method: 'GET',
            desc: 'Route for listing all available sensors.'
          }
        },
        temperatureSensor: { data }
      });
    }
  });
};

// Get current value from the humidity sensor
exports.getHumidity = (req, res, next) => {
  let DHT22 = new sensorLib.Sensor({
    type: 'DHT22',
    pin: 0X7
  }, 'humidity_sensor');

  DHT22.fetch(function (err, data) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured!',
        error: err.cause
      });
    }

    if (data.type === 'Humidity') {
      res.status(200).json({
        links: {
          sensors: {
            href: process.env.DOMAIN + 'properties',
            method: 'GET',
            desc: 'Route for listing all available sensors.'
          }
        },
        humiditySensor: { data }
      });
    }
  });
};

// Get current value from the pressure sensor
exports.getPressure = (req, res, next) => {
  let BMP180 = new sensorLib.Sensor({
    type: 'BMP180',
    address: 0x77
  }, 'pressure_sensor');
  BMP180.fetch(function (err, data) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured!',
        error: err.cause
      });
    }

    if (data.type === 'Pressure') {
      res.status(200).json({
        links: {
          sensors: {
            href: process.env.DOMAIN + 'properties',
            method: 'GET',
            desc: 'Route for listing all available sensors.'
          }
        },
        pressureSensor: { data }
      });
    }
  });
};

// Get current value from the brightness sensor
exports.getBrightness = (req, res, next) => {
  let TSL2561 = new sensorLib.Sensor({
    type: 'TSL2561',
    address: 0X39
  }, 'brightness_sensor');

  TSL2561.fetch(function (err, data) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured!',
        error: err.cause
      });
    }

    res.status(200).json({
      links: {
        sensors: {
          href: process.env.DOMAIN + 'properties',
          method: 'GET',
          desc: 'Route for listing all available sensors.'
        }
      },
      brightnessSensor: { data }
    });
  });
};