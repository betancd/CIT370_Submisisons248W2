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
const database = process.env.DB_DATABASE || 'country_db';

// Create the connection to MySQL server (without specifying the database initially)
const connectionToServer = async () =>
  new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host,
      user,
      password,
    });

    con.connect((err) => {
      if (err) {
        console.error('Error connecting to the MySQL server:', err);
        return reject(err);
      }
      console.log('Connected to the MySQL server');
      resolve(con);
    });
  });

// Function to create the database if it doesn't exist
const createDatabaseIfNotExists = async (con) => {
  return query(con, `CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
};

// Create the connection with the database
const connectionToDatabase = async () =>
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
    // Connect to MySQL server
    const conToServer = await connectionToServer();
    // Create the database if it doesn't exist
    await createDatabaseIfNotExists(conToServer);
    console.log(`Database '${database}' checked and created if not existing`);

    // Close the server connection and connect to the specific database
    conToServer.end();

    // Connect to the specific database
    const conToDatabase = await connectionToDatabase();
    // Create tables if they do not exist
    const userTableCreated = await query(conToDatabase, CREATE_USERS_TABLE);
    const countriesTableCreated = await query(conToDatabase, CREATE_COUNTRIES_TABLE);

    if (userTableCreated && countriesTableCreated) {
      console.log('Tables Created!');
    }
  } catch (err) {
    console.error('Error initializing the database:', err);
  }
})();

module.exports = connectionToDatabase;
