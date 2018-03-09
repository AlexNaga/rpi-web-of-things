const express = require('express');
const router = express.Router();

const PropertiesController = require('../controllers/properties');

// Lists all available sensors
router.get('/', PropertiesController.getProperties);

// // Get current value from the temperature sensor
router.get('/temperature', PropertiesController.getTemperature);

// // Get current value from the humidity sensor
router.get('/humidity', PropertiesController.getHumidity);

// // Get current value from the pressure sensor
router.get('/pressure', PropertiesController.getPressure);

// // Get current value from the brightness sensor
router.get('/brightness', PropertiesController.getBrightness);

module.exports = router;