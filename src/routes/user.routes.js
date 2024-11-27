// const express = require('express');
// const authController = require('../controllers/auth.controller');
// const userController = require('../controllers/user.controller');
// const verifyToken = require('../middleware/auth.middleware');

// const userRoutes = express.Router();

// userRoutes.get('/me', userController.getMe);

// userRoutes.post('/me/update', verifyToken, authController.updateUser);

// module.exports = userRoutes;

const express = require('express');
const { getMe, updateMe } = require('../controllers/user.controller');
const canAccess = require('../middleware/auth.middleware');

const userRoutes = express.Router();

userRoutes.get('/me', canAccess, getMe); // /api/user/me

userRoutes.put('/me/update', canAccess, updateMe);

module.exports = userRoutes;