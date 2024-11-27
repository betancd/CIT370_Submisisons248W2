// const express = require('express');
// const controller = require('../controllers/auth.controller');

// const authRoutes = express.Router();

// authRoutes.post('/register', controller.registerUser);

// authRoutes.post('/login', controller.login);

// module.exports = authRoutes;


const express = require('express');
const {
  register,
  login,
  logout,
  token,
} = require('../controllers/auth.controller');

const authRoutes = express.Router();

authRoutes.post('/register', register);

authRoutes.post('/login', login);

authRoutes.post('/token', token);

authRoutes.post('/logout', logout);

module.exports = authRoutes;