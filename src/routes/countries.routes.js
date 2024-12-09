const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware'); // Ensure authentication middleware is imported
const countriesController = require('../controllers/countries.controller');

// Protected route to get all countries
router.get('/', auth, countriesController.getAllCountries);

// Public route to get all ports visited
router.get('/public', countriesController.getAllPortsVisited);

// Protected route to add a new country
router.post('/', auth, countriesController.createCountry);

module.exports = router;
