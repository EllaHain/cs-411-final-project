const express = require('express');
const cors = require('cors');
const signupRouter = require('../routes/users.router.js');

const app = express();

// Enable CORS middleware
app.use(cors());

// Parse request bodies as JSON
app.use(express.json());

// Define routes
app.use('/api/users', signupRouter);

module.exports = app;
