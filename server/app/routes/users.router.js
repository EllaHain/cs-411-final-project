const express = require('express');
const usersController = require('../controllers/users.controller.js');
const router = express.Router();

router.post('/signup', usersController.signUp);
router.post('/login', usersController.logIn)

module.exports = router;


