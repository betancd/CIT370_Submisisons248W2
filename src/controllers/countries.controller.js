const mysql = require('mysql');
const connection = require('../db-config');
const {
  ALL_COUNTRIES,
  SINGLE_COUNTRY,
  INSERT_COUNTRY,
  UPDATE_COUNTRY,
  DELETE_COUNTRY,
  ALL_PORTS,
} = require('../queries/countries.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

// Get all countries
exports.getAllCountries = async (req, res) => {
  console.log("getAllCountries called"); // Debug statement
  const con = await connection().catch((err) => {
    throw err;
  });

  const countries = await query(con, ALL_COUNTRIES(req.user.id), []).catch(
    serverError(res)
  );

  if (!countries.length) {
    return res.status(200).json({ msg: 'No countries available for this user.' });
  }

  res.json(countries);
};

// Get all ports visited (public access)
exports.getAllPortsVisited = async (req, res) => {
  console.log("getAllPortsVisited called");

  try {
    const con = await connection().catch((err) => {
      console.error("Error connecting to database:", err);
      throw err;
    });

    const ports = await query(con, ALL_PORTS(), []).catch(err => {
      console.error("Error executing query:", err);
      throw err;
    });

    if (!ports.length) {
      return res.status(200).json({ msg: 'No ports visited.' });
    }

    console.log("Fetched ports visited:", ports);
    res.json(ports); // Ensure the response is JSON
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ msg: 'Server error' });
  }
};



// Get a single country by id
exports.getCountry = async (req, res) => {
  console.log("getCountry called"); // Debug statement
  const con = await connection().catch((err) => {
    throw err;
  });

  const country = await query(
    con, 
    SINGLE_COUNTRY(req.user.id, req.params.Countryid)
  ).catch(serverError(res));

  if (!country.length) {     
    return res.status(400).json({ msg: 'No country available for this user.' });
  }

  res.json(country);
};

// Create a new country
exports.createCountry = async (req, res) => {
  console.log("createCountry called"); // Debug statement
  const user = req.user;

  if (user && user.id) {
    const con = await connection().catch((err) => {
      console.error("Error connecting to database:", err); // Debug statement
      throw err;
    });

    const countryName = mysql.escape(req.body.nation);
    const status = mysql.escape(req.body.status);
    const visitDate = req.body.Visit_date ? `${req.body.Visit_date}-01` : null; // Convert to 'YYYY-MM-01' format

    console.log('Inserting country with data:', { userId: user.id, nation: countryName, status, visitDate }); // Debug statement

    const result = await query(
      con,
      `INSERT INTO countries (user_id, nation, status, Visit_date) VALUES (${user.id}, ${countryName}, ${status}, ${visitDate ? `'${visitDate}'` : 'null'})`
    ).catch(err => {
      console.error("Error executing query:", err); // Debug statement
      return serverError(res)(err);
    });

    if (result.affectedRows !== 1) {
      return res
        .status(500)
        .json({ msg: `Unable to add country: ${req.body.nation}` });
    }

    res.json({ msg: 'Added country successfully!' });
  } else {
    console.error("User not authorized or user ID missing"); // Debug statement
    res.status(401).json({ msg: 'User not authorized' });
  }
};


// Helper function to build values string for update
const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map((key) => {
    let value = mysql.escape(body[key]);
    if (key === 'Visit_date') {
      value = `'${body[key]}-01'`;
    }
    return `${key} = ${value}`;
  });

  return values.join(', ');
};

// Update an existing country
exports.updateCountry = async (req, res) => {
  console.log("updateCountry called"); // Debug statement
  const con = await connection().catch((err) => {
    throw err;
  });

  const values = _buildValuesString(req);
  const result = await query(
    con, 
    UPDATE_COUNTRY(req.user.id, req.params.Countryid, values) // Ensure parameter name matches
  ).catch(serverError(res));
     
  if (result.affectedRows !== 1) {
    return res
      .status(500)
      .json({ msg: `Unable to update country: '${req.body.nation}'` });
  }

  res.json({ msg: 'Updated successfully!' });
};

// Delete a country by id
exports.deleteCountry = async (req, res) => {
  console.log("deleteCountry called"); // Debug statement
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(
    con,
    DELETE_COUNTRY(req.user.id, req.params.Countryid) // Ensure parameter name matches
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    return res
      .status(500)
      .json({ msg: `Unable to delete country with id: ${req.params.Countryid}` });
  }

  res.json({ msg: 'Country deleted successfully!' });
};
