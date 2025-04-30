const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../Controllers/authControllers');

// Logging and Registering Routes
// These routes handle user registration and login
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;