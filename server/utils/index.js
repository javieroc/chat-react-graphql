const bcrypt = require('bcrypt');

const encryptPassword = (password) => {
  return bcrypt.hash(password, 10).then(hash => hash);
};

const checkPassword = (password, hash) => {
  return bcrypt.compare(password, hash).then(res => res);
};

module.exports = {
  encryptPassword,
  checkPassword,
};
