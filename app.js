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
const sensorLib = require('raspi-sensors');
const refreshTimeInSec = 5;

let BMP180 = new sensorLib.Sensor({
  type: 'BMP180',
  address: 0x77
}, 'temp_pressure_sensor');

let DHT22 = new sensorLib.Sensor({
  type: 'DHT22',
  address: 0X7
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
}

BMP180.fetch(cb);
DHT22.fetch(cb);
TSL2561.fetch(cb);

// DHT22.fetchInterval(cb, refreshTimeInSec);

module.exports = app;