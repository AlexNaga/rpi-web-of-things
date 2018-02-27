const express = require('express');
const router = express.Router();

const githubController = require('../controllers/github');

router.post('/', githubController.githubWebhook);

module.exports = router;