const casual = require('casual')
const models = require('../models')
const User = models.user

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Create 10 users
    const promises = Array(10).fill().map((_) => {
      return User.create({
        username: casual.username,
        email: casual.email,
        avatar: 'http://www.gravatar.com/avatar/?s=200'
      })
    })

    return Promise.all(promises)
  },

  down: (queryInterface, Sequelize) => {
  }
}
