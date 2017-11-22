const casual = require('casual');
const { user } = require('../models');
const utils = require('../../utils');

module.exports = {
  up: () => {
    // Create 10 users
    const promises = Array(10).fill().map(() => {
      return utils.encryptPassword('secret').then((hash) => {
        return user.create({
          username: casual.username,
          email: casual.email,
          password: hash,
          avatar: 'http://www.gravatar.com/avatar/?s=200',
        });
      });
    });

    return Promise.all(promises);
  },
  down: () => {
  },
};
