const bcrypt = require('bcrypt');
const _ = require('lodash');

const encryptPassword = (password) => {
  return bcrypt.hash(password, 10).then(hash => hash);
};

const checkPassword = (password, hash) => {
  return bcrypt.compare(password, hash).then(res => res);
};

const formatErrors = (err, models) => {
  if (err instanceof models.sequelize.ValidationError) {
    return err.errors.map(x => _.pick(x, ['path', 'message']));
  }

  return [{ path: 'name', message: 'Something went wrong' }];
};

module.exports = {
  encryptPassword,
  checkPassword,
  formatErrors,
};
