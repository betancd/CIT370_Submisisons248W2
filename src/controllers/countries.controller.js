const connection = require('../db-config');
const {
  ALL_COUNTRIES,
  SINGLE_COUNTRY,
  INSERT_COUNTRY,
  UPDATE_COUNTRY,
  DELETE_COUNTRY,
} = require('../queries/countries.queries');
const query = require('../utils/query');

exports.getAllCountries = async (req, res) => {
  try {
    const con = await connection();
    const countries = await query(con, ALL_COUNTRIES);

    // Ensure only one response is sent
    if (!res.headersSent) {
      if (countries.length) {
        return res.json(countries);
      } else {
        return res.status(404).json({ message: 'No countries found' });
      }
    }
  } catch (err) {
    console.error('Error fetching countries:', err);
    
    // Ensure only one response is sent
    if (!res.headersSent) {
      return res.status(500).json({ error: { message: 'Error fetching countries' } });
    }
  }
};



exports.getCountry = async (req, res) => {
  try {
    const con = await connection();
    const country = await query(con, SINGLE_COUNTRY, [req.params.Countryid]);

    if (country.length) {
      res.json(country);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (err) {
    console.error('Error fetching country:', err);
    res.status(500).json({ error: { message: 'Error fetching country' } });
  }
};

exports.createCountry = async (req, res) => {
  try {
    const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

    if (decoded.id) {
      const con = await connection();
      const result = await query(con, INSERT_COUNTRY, [req.body.nation]);

      if (result.affectedRows === 1) {
        res.json({ message: 'Created successfully.' });
      } else {
        res.status(400).json({ message: 'Error creating country' });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    console.error('Error creating country:', err);
    res.status(500).json({ error: { message: 'Error creating country' } });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const con = await connection();
    const result = await query(con, UPDATE_COUNTRY, [
      req.body.nation,
      req.params.status,
      req.body.Visit_date,
      req.params.Countryid,
    ]);

    if (result.affectedRows === 1) {
      res.json(result);
    } else {
      res.status(400).json({ message: 'Error updating country' });
    }
  } catch (err) {
    console.error('Error updating country:', err);
    res.status(500).json({ error: { message: 'Error updating country' } });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const con = await connection();
    const result = await query(con, DELETE_COUNTRY, [req.params.Countryid]);

    if (result.affectedRows === 1) {
      res.json({ message: 'Deleted successfully.' });
    } else {
      res.status(400).json({ message: 'Error deleting country' });
    }
  } catch (err) {
    console.error('Error deleting country:', err);
    res.status(500).json({ error: { message: 'Error deleting country' } });
  }
};
