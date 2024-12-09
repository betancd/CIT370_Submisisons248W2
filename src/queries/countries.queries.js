exports.CREATE_COUNTRIES_TABLE = `CREATE TABLE IF NOT EXISTS countries(
  Countryid INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  nation VARCHAR(255) NOT NULL,
  status VARCHAR(11) DEFAULT 'not visited',
  Visit_date DATE DEFAULT NULL,
  PRIMARY KEY (Countryid),
  FOREIGN KEY (user_id) REFERENCES users(user_id) 
   ON UPDATE CASCADE
   ON DELETE CASCADE
)`;

// Get every country
exports.ALL_COUNTRIES = (userId) => `SELECT * FROM countries WHERE user_id = ${userId}`;

// Get a single country by id
exports.SINGLE_COUNTRY = (userId, countryId) => 
  `SELECT * FROM countries WHERE user_id = ${userId} AND Countryid = ${countryId}`;

exports.INSERT_COUNTRY = (userId, Nation) => {
  const escapedNation = Nation.replace(/'/g, "\\'");
  return `INSERT INTO countries (user_id, nation) VALUES (${userId}, '${escapedNation}')`;
};

exports.UPDATE_COUNTRY = (userId, countryId, newValues) =>
  `UPDATE countries SET ${newValues} WHERE user_id = ${userId} AND Countryid = ${countryId}`;

exports.DELETE_COUNTRY = (userId, countryId) =>
  `DELETE FROM countries WHERE user_id = ${userId} AND Countryid = ${countryId}`;

// Get all ports visited (public access)
exports.ALL_PORTS = () => `SELECT * FROM countries`;  // Assuming you have a ports_visited table
