// index.js

const express = require('express');
const cors = require('cors');
const authController = require('./controllers/authController'); // Import authController module


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
//app.get('/auth', authController.auth); // Use auth function from authController for /auth route
//app.get('/callback', authController.callback); // Use callback function from authController for /callback route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
