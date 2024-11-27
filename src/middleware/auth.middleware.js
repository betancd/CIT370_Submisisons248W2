// const jwt = require('jsonwebtoken');
// const jwtconfig = require('../jwt-config');

// module.exports = function(req, res, next) {
//     const token = req.headers['auth-token'];

//     if(!token) {
//         // stop user auth validation
//         res.status(401).send({ auth: false, msg: 'Access Denied!' });
//     }

//     try {
//         // return the user's id when creating token
//         const verified = jwt.verify(token, jwtconfig.secret);
//         req.user = verified; 
//         next();
//     } catch (err) {
//         res.status(400).send({ msg: 'Invalid Token' });
//     }
// };

const { jwtconfig, verifyToken } = require('../utils/jwt-helpers');

module.exports = (req, res, next) => {
  const authHeader = req.headers['auth-token'] || req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).send({ auth: false, msg: 'Access Denied! No Token provided.' });    
  }

  const tokenParts = authHeader.split(' ');
  if(tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).send({ auth: false, msg: 'Access Denied. Malformed token.' });
  }

  const accessToken = tokenParts[1];

  if (!accessToken) {
    // stop user auth validation
    res
      .status(401)
      .send({ auth: false, msg: 'Access Denied. No token provided.' });
  }

  try {
    // verify the token is correct
    const user = verifyToken(accessToken, jwtconfig.access, req, res); // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }
    req.user = user;
    next();
  } catch (err) {
    res.status(403).send({ msg: 'Invalid Token' });
  }
};