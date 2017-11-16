const casual = require('casual');
const { message } = require('../models');

module.exports = {
  up: () => {
    // Create 120 messages from random user in a random room
    const promises = Array(500).fill().map(() => {
      return message.create({
        text: casual.text,
        room_id: casual.integer(1, 30),
        user_id: casual.integer(1, 10),
      });
    });

    return Promise.all(promises);
  },
  down: () => {
  },
};
