const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token and extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Remove or comment out the debug statement below
    // console.log('Decoded user:', req.user);

    next();
  } catch (err) {
    console.error('Token verification error:', err); // It's good to keep this error log for future debugging
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
