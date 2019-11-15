const bcrypt = require('bcrypt');

module.exports = pass => {
  return bcrypt.hashSync(pass, 10);
};
