// index.js

const express = require('express');
const cors = require('cors');
const playlistsRouter = require('./routes/playlists.router.js');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
//app.get('/auth', authController.auth); // Use auth function from authController for /auth route
app.use('/api/spotify', playlistsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
