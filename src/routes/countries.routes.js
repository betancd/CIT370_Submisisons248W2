const controllers = require('../controllers/countries.controller');
const express = require('express');

const countriesRoutes = express.Router();
/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all tasks. Evaluates to `/tasks/`.
 */
countriesRoutes.get('/', controllers.getAllCountries).post('/', controllers.createCountry);

/**
 * Routes for a task by id. Evalutes to `/tasks/:taskId`.
 */
countriesRoutes
  .get('/:countryId', controllers.getCountry) // GET http://locahost:3000/tasks/1
  .put('/:countryId', controllers.updateCountry)
  .delete('/:countryId', controllers.deleteCountry);

module.exports = countriesRoutes;
