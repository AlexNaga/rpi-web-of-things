const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
// const mongoose = require('mongoose');

const indexRoutes = require('./src/routes/index');

// mongoose.connect(
//   'mongodb://' + process.env.MONGO_ATLAS_USERNAME +
//   ':' + process.env.MONGO_ATLAS_PASSWORD +
//   '@rest-api-shard-00-00-wgaf2.mongodb.net:27017,rest-api-shard-00-01-wgaf2.mongodb.net:27017,rest-api-shard-00-02-wgaf2.mongodb.net:27017/notifyMe?ssl=true&replicaSet=rest-api-shard-0&authSource=admin'
//   // , () => { mongoose.connection.db.dropDatabase(); }
// );
// mongoose.Promise = global.Promise;

app.use(logger('dev')); // Logs all requests to the terminal
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/', indexRoutes);

// Error handling
app.use((req, res, next) => {
  const err = new Error('The resource could not be found.');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

// Setup sensors
const gpioSensorLib = require('node-dht-sensor');
const i2cSensorLib = require('raspi-sensors');
const refreshTimeInSec = 5;

const gpioSensor = {
  sensors: [{
    name: 'AM2302',
    type: 22,
    pin: 4
  }],

  read: function () {
    for (let a in this.sensors) {
      let b = gpioSensorLib.read(this.sensors[a].type, this.sensors[a].pin);
      console.log(this.sensors[a].name + ': ' +
        b.temperature.toFixed(1) + '°C, ' +
        b.humidity.toFixed(1) + '%');
    }

    setTimeout(() => {
      gpioSensor.read();
    }, refreshTimeInSec * 1000);
  }
};

const BMP180 = new i2cSensorLib.Sensor({
  type: 'BMP180',
  address: 0x77
}, 'temp_pressure_sensor');

const TSL2561 = new i2cSensorLib.Sensor({
  type: 'TSL2561',
  address: 0X39
}, 'light_sensor');

// Read sensors
gpioSensor.read();

BMP180.fetchInterval((err, data) => {
  if (err) {
    console.error("An error occured!");
    console.error(err.cause);
    return;
  }

  console.log(data.sensor_type + ': ' +
    data.value.toFixed(2) + '°C, ' +
    b.humidity.toFixed(1) + '%');

  console.log(data.sensor_type);
  console.log(data.value.toFixed(2) + ' ' + data.unit_display);
}, refreshTimeInSec);

BMP180.fetchInterval((err, data) => {
  if (err) {
    console.error("An error occured!");
    console.error(err.cause);
    return;
  }

  console.log(data.sensor_type);
  console.log(data.value.toFixed(2) + ' ' + data.unit_display);
}, refreshTimeInSec);

module.exports = app;