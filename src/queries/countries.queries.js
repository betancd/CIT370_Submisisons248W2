
exports.CREATE_COUNTRIES_TABLE = `CREATE TABLE IF NOT EXISTS countries(
  Countryid int NOT NULL AUTO_INCREMENT,
  nation varchar(255) NOT NULL,
  status varchar(11) DEFAULT 'not visited',
  Visit_date varchar(8) DEFAULT 'unknown',
  PRIMARY KEY (Countryid)
)`;

// Get every task
exports.ALL_COUNTRIES = `SELECT * FROM countries`;

// Get a single task by id
exports.SINGLE_COUNTRIES = `SELECT * FROM countries WHERE Countryid = ?`;


exports.INSERT_COUNTRY = `INSERT INTO countries (nation) VALUES (?)`;

exports.UPDATE_COUNTRY = `UPDATE countries SET nation = ?, status = ?, Visit_date = ? WHERE Countryid = ?`;

// Delete a task by id
exports.DELETE_COUNTRY = `DELETE FROM countries WHERE Countryid = ?`;
