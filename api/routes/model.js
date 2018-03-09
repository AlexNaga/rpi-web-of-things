const express = require('express');
const router = express.Router();

const modelController = require('../controllers/model');

router.get('/', modelController.model_index);

module.exports = router;