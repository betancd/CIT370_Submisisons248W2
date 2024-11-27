
exports.CREATE_COUNTRIES_TABLE = `CREATE TABLE IF NOT EXISTS countries(
  Countryid int NOT NULL AUTO_INCREMENT,
  user_id varchar(50) NOT NULL,
  nation varchar(255) NOT NULL,
  status VARCHAR(11) DEFAULT 'not visited',
  Visit_date varchar(8) DEFAULT 'unknown',
  PRIMARY KEY (Countryid),
  FOREIGN KEY (user_id) REFERENCES users(user_id) 

)`;

// Get every country
exports.ALL_COUNTRIES = `SELECT * FROM countries`;

// Get a single country by id
exports.SINGLE_COUNTRY = `SELECT * FROM countries WHERE Countryid = ?`;

exports.INSERT_COUNTRY = `INSERT INTO countries (nation) VALUES (?)`;

exports.UPDATE_COUNTRY = `UPDATE countries SET nation = ?, status = ?, Visit_date = ? WHERE Countryid = ?`;

// Delete a country by id
exports.DELETE_COUNTRY = `DELETE FROM countries WHERE Countryid = ?`;
