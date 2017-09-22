const casual = require('casual')
const models = require('../models')
const Message = models.message

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Create 120 messages from random user in a random room
    const promises = Array(120).fill().map((_) => {
      return Message.create({
        text: casual.text,
        room_id: casual.integer(1, 30),
        user_id: casual.integer(1, 10)
      })
    })

    return Promise.all(promises)
  },

  down: (queryInterface, Sequelize) => {

  }
}
