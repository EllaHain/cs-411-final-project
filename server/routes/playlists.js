// routes/playlists.js

const express = require('express');
const router = express.Router();
const playlistsController = require('../controllers/playlistsController');
const { authenticateToken } = require('../middleware/authentication');

// Define routes
router.get('/', authenticateToken, playlistsController.getPlaylists);

module.exports = router;
