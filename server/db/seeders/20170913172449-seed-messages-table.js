const casual = require('casual')
const models = require('../models')
const Message = models.message

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Create 30 messages from random user in a random room
    const promises = Array(30).fill().map((_) => {
      return Message.create({
        text: casual.text,
        room_id: casual.integer(1, 3),
        user_id: casual.integer(1, 10)
      })
    })

    return Promise.all(promises)
  },

  down: (queryInterface, Sequelize) => {

  }
}
