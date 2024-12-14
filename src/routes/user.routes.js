const express = require('express');
const { getMe, updateMe, registerUser } = require('../controllers/user.controller');
const canAccess = require('../middleware/auth.middleware');

const userRoutes = express.Router();

// User registration route
userRoutes.post('/register', registerUser);

// Route to get user information
userRoutes.get('/me', canAccess, getMe);

// Route to update user information
userRoutes.put('/me/update', canAccess, updateMe);

module.exports = userRoutes;
