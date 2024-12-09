const jwt = require('jsonwebtoken');

const refreshTokens = [];

// Function to generate an access token
const generateAccessToken = (userId, options = {}) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, options);
};

// Function to generate a refresh token
const generateRefreshToken = (userId, options = {}) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, options);
};

// Function to verify a token
const verifyToken = (token, secret, req, res) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    throw new Error('Token is not valid');
  }
};

module.exports = {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};
