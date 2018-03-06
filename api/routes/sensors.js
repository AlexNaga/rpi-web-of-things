const express = require('express');
const router = express.Router();

const SensorsController = require('../controllers/sensors');

// Lists all available sensors
router.get('/', SensorsController.listSensors);

// // Get current value from the temperature sensor
router.get('/temperature', SensorsController.getTemperature);

// // Get current value from the humidity sensor
router.get('/humidity', SensorsController.getHumidity);

// // Get current value from the pressure sensor
router.get('/pressure', SensorsController.getPressure);

// // Get current value from the brightness sensor
router.get('/brightness', SensorsController.getBrightness);

module.exports = router;