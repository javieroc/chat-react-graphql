const casual = require('casual');
const { user } = require('../models');

module.exports = {
  up: () => {
    // Create 10 users
    const promises = Array(10).fill().map(() => {
      return user.create({
        username: casual.username,
        email: casual.email,
        avatar: 'http://www.gravatar.com/avatar/?s=200',
      });
    });

    return Promise.all(promises);
  },
  down: () => {
  },
};
