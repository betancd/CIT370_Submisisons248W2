exports.GET_ME_BY_USER_ID = `SELECT user_ID, username, email FROM users WHERE user_id = ?`;

exports.GET_ME_BY_USERNAME = `SELECT user_id, username, email FORM users WHERE username = ?`;

exports.GET_ME_BY_USER_ID_WITH_PASSWORD = `SELECT * FROM users WERE user_id = ?`;

exports.GET_ME_BY_USERNAME_WITH_PASSWORD = `SELECT * FROM users WHERE username = ?`;