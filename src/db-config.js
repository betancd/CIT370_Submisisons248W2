const mysql = require('mysql');
const { CREATE_USERS_TABLE } = require('./queries/user.queries');
const { CREATE_COUNTRIES_TABLE } = require('./queries/countries.queries');
const query = require('./utils/query');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'password';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'school_stuff'; /////////////

// Create the connection with required details
const connection = async () =>
  new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host,
      user,
      password,
      database,
    }); 

    con.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        return reject(err);
      }
      console.log('Connected to the database');
      resolve(con);
    });
  });

// Initialize the database and create tables if they do not exist
(async () => {
  try {
    const _con = await connection();
    const userTableCreated = await query(_con, CREATE_USERS_TABLE);
    const countriesTableCreated = await query(_con, CREATE_COUNTRIES_TABLE);

    if (userTableCreated && countriesTableCreated) {
      console.log('Tables Created!');
    }
  } catch (err) {
    console.error('Error initializing the database:', err);
  }
})();

module.exports = connection;
