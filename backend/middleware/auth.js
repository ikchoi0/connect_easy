const jwt = require('jsonwebtoken');
const User = require('../models/user');

const config = process.env;

const verifyToken = (userRole) => {
  return async (req, res, next) => {
    let token =
      req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {
      return res.status(403).send('a token is required for authentication');
    }

    try {
      token = token.replace(/^Bearer\s+/, '');
      const decoded = jwt.verify(token, config.TOKEN_KEY);

      const user = await User.findById(decoded.userId, {
        _id: 1,
        role: 1,
        email: 1,
      });

      if (!userRole.includes(user.role)) {
        return res
          .status(403)
          .send('you are not authorized to access this resource');
      }

      req.user = user;
    } catch (error) {
      return res.status(401).send('invalid token');
    }

    next();
  };
};

module.exports = verifyToken;
