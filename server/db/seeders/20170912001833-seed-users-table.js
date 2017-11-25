const casual = require('casual');
const bcrypt = require('bcrypt');
const { user } = require('../models');

const encryptPassword = (password) => {
  return bcrypt.hash(password, 10).then(hash => hash);
};

module.exports = {
  up: () => {
    // Create 10 users
    const promises = Array(10).fill().map(() => {
      return encryptPassword('secret').then((hash) => {
        const { username } = casual;
        return user.create({
          username,
          email: casual.email,
          password: hash,
          avatar: `https://robohash.org/${username}/?size=200x200`,
        });
      });
    });

    return Promise.all(promises);
  },
  down: () => {
  },
};
