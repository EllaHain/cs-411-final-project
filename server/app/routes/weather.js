// routes/weather.js

const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { authenticateToken } = require('../middleware/authentication');

// Define routes
router.get('/', authenticateToken, weatherController.getWeather);

module.exports = router;
