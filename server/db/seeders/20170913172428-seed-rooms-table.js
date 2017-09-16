const casual = require('casual')
const models = require('../models')
const Room = models.room

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Create 3 rooms with a random owner
    const promises = Array(3).fill().map((_) => {
      return Room.create({
        name: casual.color_name,
        limit: casual.integer(5, 10),
        user_id: casual.integer(1, 10)
      })
    })

    return Promise.all(promises)
  },

  down: (queryInterface, Sequelize) => {
  }
}
