const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', indexController.api_index);

module.exports = router;