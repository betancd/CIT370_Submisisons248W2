const bcrypt = require('bcryptjs');
const connection = require('../db-config');
const {
  GET_ME_BY_USERNAME,
  GET_ME_BY_USERNAME_WITH_PASSWORD,
  INSERT_NEW_USER,
} = require('../queries/user.queries');
const query = require('../utils/query');
const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
  verifyToken
} = require('../utils/jwt-helpers');

exports.register = async (req, res) => {
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  const params = [req.body.username, req.body.email, passwordHash];

  try {
    const con = await connection();

    const user = await query(con, GET_ME_BY_USERNAME, [req.body.username]);

    if (user.length === 1) {
      return res.status(403).json({ msg: 'User already exists!' });
    }

    await query(con, INSERT_NEW_USER, params);

    res.json({ msg: 'New user created!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Could not register user. Please try again later.' });
  }
};

exports.login = async (req, res) => {
  try {
    const con = await connection();

    const user = await query(con, GET_ME_BY_USERNAME_WITH_PASSWORD, [req.body.username]);

    if (user.length === 1) {
      const validPass = await bcrypt.compare(req.body.password, user[0].password);

      if (!validPass) {
        return res.status(400).json({ msg: 'Invalid password!' });
      }

      const accessToken = generateAccessToken(user[0].user_id, { expiresIn: '1h' });
      const refreshToken = generateRefreshToken(user[0].user_id, { expiresIn: '1d' });

      refreshTokens.push(refreshToken);

      // Remove or comment out the debug statement below
      // console.log('Login successful, token generated:', accessToken);

      return res.json({
        auth: true,
        msg: 'Logged in!',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: 3600,
        refresh_token: refreshToken,
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
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
