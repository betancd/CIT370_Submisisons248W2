const con = require('../db-config');
const queries = require('../queries/countries.queries');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

exports.getAllCountries = function(req, res) {
  con.query(queries.ALL_COUNTRIES, function(err, result, fields) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

// http://localhost:3000/tasks/1
exports.getCountry = function(req, res) {
  con.query(queries.SINGLE_COUNTRIES, [req.params.CountryId], function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

// http://localhost:3000/tasks/1
/**
 * POST request -
 * {
 *  name: 'A task name'
 * }
 */
exports.createCountry = function(req, res) {
  con.query(queries.INSERT_COUNTRY, [req.body.nation], function(err, result) {
    if (err) {
      res.send(err);
    }
    console.log(result);
    res.json({ message: 'Added places visited: ' + result.affectedRows });
  });
};

// http://localhost:3000/tasks/1
/**
 * PUT request -
 * {
 *  name: 'A task name',
 *  state: 'completed'
 * }
 */
exports.updateCountry = function(req, res) {
  con.query(
    queries.UPDATE_COUNTRY,
    [req.body.nation, req.body.status, req.body.Visit_date, req.params.CountryId],
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

// http://localhost:3000/tasks/1
exports.deleteCountry = function(req, res) {
  con.query(queries.DELETE_COUNTRY, [req.params.CountryId], function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Deleted successfully.' });
  });
};
