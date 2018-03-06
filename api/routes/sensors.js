const express = require('express');
const router = express.Router();

const SensorsController = require('../controllers/sensors');

// Lists all sensors
router.get('/', SensorsController.listSensors);

// Get value from temperature sensor
router.get('/temperature', SensorsController.getTemperature);

// Get value from humidity sensor
router.get('/humidity', SensorsController.getHumidity);

// Get value from pressure sensor
router.get('/pressure', checkAuth, SensorsController.getPressure);

// Get value from light sensor
router.get('/brightness', SensorsController.getBrightness);

module.exports = router;