const express = require('express');
const {
  getAllCountries,
  createCountry,
  getCountry,
  updateCountry,
  deleteCountry,
} = require('../controllers/countries.controller');

const canAccess = require('../middleware/auth.middleware');

const countriesRoutes = express.Router();

countriesRoutes
  .get('/', canAccess, getAllCountries)
  .post('/', canAccess, createCountry);

countriesRoutes
  .get('/:Countryid', canAccess, getCountry) // Example: GET http://locahost:3000/api/countries/1
  .put('/:Countryid', canAccess, updateCountry)
  .delete('/:Countryid', canAccess, deleteCountry);

module.exports = countriesRoutes;















// const controllers = require('../controllers/countries.controller');
// const express = require('express');

// const countriesRoutes = express.Router();


// countriesRoutes.get('/', controllers.getAllCountries).post('/', controllers.createCountry);

// countriesRoutes
//   .get('/:Countryid', controllers.getCountry) // Example: GET http://locahost:3000/api/countries/1
//   .put('/:Countryid', controllers.updateCountry)
//   .delete('/:Countryid', controllers.deleteCountry);

// module.exports = countriesRoutes;
