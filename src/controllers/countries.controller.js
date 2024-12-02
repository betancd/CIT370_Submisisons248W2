const mysql = require('mysql');
const connection = require('../db-config');
const {
  ALL_COUNTRIES,
  SINGLE_COUNTRY,
  INSERT_COUNTRY,
  UPDATE_COUNTRY,
  DELETE_COUNTRY,
} = require('../queries/countries.queries');
const query = require('../utils/query');
const { serverError } = require('../utils/handlers');

// Get all countries
exports.getAllCountries = async (req, res) => {
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

// Get a single country by id
exports.getCountry = async (req, res) => {
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
  const user = req.user;

  if (user.id) {
      const con = await connection().catch((err) => {
          throw err;
      });

      const countryName = mysql.escape(req.body.country_nation);
      const status = mysql.escape(req.body.status);
      const visitDate = req.body.Visit_date ? mysql.escape(req.body.Visit_date) : `'unknown'`;

      const result = await query(
          con,
          `INSERT INTO countries (user_id, nation, status, Visit_date) VALUES (${user.id}, ${countryName}, ${status}, ${visitDate})`
      ).catch(serverError(res));

      if (result.affectedRows !== 1) {
          return res
              .status(500)
              .json({ msg: `Unable to add country: ${req.body.country_nation}` });
      }

      res.json({ msg: 'Added country successfully!' });
  }
};



// Helper function to build values string for update
const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    (key) => `${key} = ${mysql.escape(body[key])}`
  );

  values.push(`created_date = NOW()`);
  return values.join(', ');
};

// Update an existing country
exports.updateCountry = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const values = _buildValuesString(req);
  const result = await query(
    con, 
    UPDATE_COUNTRY(req.user.id, req.params.Countryid, values)
  ).catch(serverError(res));
     
  if (result.affectedRows !== 1) {
    return res
      .status(500)
      .json({ msg: `Unable to update country: '${req.body.country_nation}'` });
  }

  res.json(result);
};

// Delete a country by id
exports.deleteCountry = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(
    con, 
    DELETE_COUNTRY(req.user.id, req.params.Countryid)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    return res
      .status(500)
      .json({ msg: `Unable to delete country at: ${req.body.country_nation}` });
  }

  res.json({ msg: 'Country deleted successfully!' });
};
























// const mysql = require('mysql');
// const connection = require('../db-config');
// const {
//   ALL_COUNTRIES,
//   SINGLE_COUNTRY,
//   INSERT_COUNTRY,
//   UPDATE_COUNTRY,
//   DELETE_COUNTRY,
// } = require('../queries/countries.queries');
// const query = require('../utils/query');
// const { serverError } = require('../utils/handlers');

// exports.getAllCountries = async (req, res) => {
//     const con = await connection().catch((err) => {
//       throw err;
//     });

//     const countries = await query(con, ALL_COUNTRIES(req.user.id), []).catch(
//       serverError(res)
//     );

//       if (!countries.length) {
//         res.status(200).json({ msg: 'No countries available for this user.'});
//       }
//       res.json(countries);
//     };

// exports.getCountry = async (req, res) => {
//   //establish connection
//     const con = await connection().catch((err) => {
//       throw err;
//     });

//     //query all task
//     const country = await query(
//       con, 
//       SINGLE_COUNTRY(req.user.id, req.params.Countryid)
//     ).catch(serverError(res));

//     if (!country.length) {     
//       res.status(400).json({ msg: 'No country available for this user.'});
//     }
//     res.json(country);
//   };

// exports.createCountry = async (req, res) => {
  
//     const user = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

//     if (user.id) {
//       const con = await connection().catch((err) => {
//         throw err;
//       });

//       const countryName = mysql.escape(req.body.country_nation);
//       const result = await query(con, INSERT_COUNTRY(user.id, countryName)).catch(  ///////////
//         serverError(res)
//       );

//       if (result.affectedRows !== 1) {
//         res
//         .status(500)
//         .json({ msg: `Unable to add country: ${req.body.country_nation}` });
//       }
//       res.json({ msg: 'Added country successfully!' });
//   }
// };


// const _buildValuesString = (req) => {
//   const body = req.body;
//   const values = Object.keys(body).map(
//     (key) => `${key} = ${mysql.escape(body[key])}` // mysql.escape(body[key]
//   );

// values.push(`created_date = NOW()`);
// return values.join(', ');
// //return values;
// };



// exports.updateCountry = async (req, res) => {

//     const con = await connection().catch((err) => {
//       throw err;
//     });
//     const values = _buildValuesString(req);
    
//     const result = await query(
//       con, 
//       UPDATE_COUNTRY(req.user.id, req.params.Countryid, values)
//      ).catch(serverError(res));
     
//     if (result.affectedRows !== 1) {
//       res
//       .status(500)
//       .json({ msg: `Unable to update country: '${req.body.country_nation}'` });
//     } 
//       res.json(result);
//   };

// exports.deleteCountry = async (req, res) => {
  
//     const con = await connection().catch((err) => {
//       throw err;
//     });

//     const result = await query(
//       con, 
//       DELETE_COUNTRY(req.user.id, req.params.Countryid)
//     ).catch(serverError(res));

//     if(result.affectedRows !== 1) {
//       res
//       .status(500)
//       .json({ msg: `Unable to delete country at: ${req.body.country_nation}` });
//     }
//     res.json({ msg: 'Country deleted successfully!' });
//   };

