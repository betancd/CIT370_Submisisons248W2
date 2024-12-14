const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware'); // Ensure authentication middleware is imported
const countriesController = require('../controllers/countries.controller');

// Protected route to get all countries
router.get('/', auth, countriesController.getAllCountries);

// Public route to get all ports visited
router.get('/public', countriesController.getAllPortsVisited); // Ensure this route is defined

// Protected route to add a new country
router.post('/', auth, countriesController.createCountry);

// Protected route to update a country
router.put('/:Countryid', auth, countriesController.updateCountry);

// Protected route to delete a country
router.delete('/:Countryid', auth, countriesController.deleteCountry);

module.exports = router;
