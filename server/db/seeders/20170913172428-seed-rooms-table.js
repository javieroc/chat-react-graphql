const casual = require('casual');
const { room } = require('../models');

module.exports = {
  up: () => {
    // Create 30 rooms with a random owner
    const promises = Array(30).fill().map(() => {
      return room.create({
        name: casual.words(2),
        limit: casual.integer(5, 10),
        user_id: casual.integer(1, 10),
      });
    });

    return Promise.all(promises);
  },
  down: () => {
  },
};
