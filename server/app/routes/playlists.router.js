// app/routes/playlistRoutes.js
const express = require('express');
const router = express.Router();
const cors = require('cors')
const playlistsController = require('../controllers/playlistsController');



router.post('/playlists', playlistsController.createPlaylist);

module.exports = router;
