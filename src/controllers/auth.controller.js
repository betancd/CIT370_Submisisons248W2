const bcrypt = require('bcryptjs');
const connection = require('../db-config');
const {
  GET_ME_BY_USERNAME_WITH_PASSWORD,
  INSERT_NEW_USER,
} = require('../queries/user.queries');  // Import from user.queries
const query = require('../utils/query');
const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
  verifyToken
} = require('../utils/jwt-helpers');

exports.register = async (req, res) => {
  try {
    console.log("Register function called");
    console.log("Request body:", req.body);

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const con = await connection();
    const result = await query(
      con, 
      INSERT_NEW_USER, 
      [req.body.username, req.body.email, hashedPassword]
    ); 

    if (result.affectedRows === 1) {
      res.json({ msg: 'New user created!' });
    } else {
      res.status(500).json({ msg: 'Could not register user.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Could not register user.' });
  }
};

exports.login = async (req, res) => {
  try {
    const con = await connection();
    const user = await query(con, GET_ME_BY_USERNAME_WITH_PASSWORD, [req.body.username]);

    if (user.length === 1) {
      const validPass = await bcrypt.compare(req.body.password, user[0].password);

      if (!validPass) {
        return res.status(400).json({ auth: false, msg: 'Invalid password!' });
      }

      const accessToken = generateAccessToken(user[0].user_id, { expiresIn: '1h' });
      const refreshToken = generateRefreshToken(user[0].user_id, { expiresIn: '1d' });

      refreshTokens.push(refreshToken);

      return res.json({
        auth: true,
        msg: 'Logged in!',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: 3600,
        refresh_token: refreshToken,
      });
    } else {
      return res.status(401).json({ auth: false, msg: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.token = (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(401).json({ auth: false, msg: 'Access Denied. No token provided.' });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ msg: 'Invalid Refresh Token' });
  }

  try {
    const verified = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET, req, res);

    if (verified) {
      const accessToken = generateAccessToken(verified.id, { expiresIn: '1h' });
      res.json({
        auth: true,
        msg: 'Token refreshed!',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: 3600,
        refresh_token: refreshToken,
      });
    } 
  } catch (err) { 
    return res.status(403).json({ msg: 'Invalid Token' }); 
  }
};

exports.logout = (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken);

  res.json({ msg: 'Logout successful' });
};
