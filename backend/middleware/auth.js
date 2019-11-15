const jwt = require('jsonwebtoken');
const keys = require('../config/jwt.keys');
const bcrypt = require('bcrypt');

module.exports.auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, keys);

    req.userData = decoded;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports.login = (pass, passhash) => {
  return bcrypt.compareSync(pass, passhash);
};
