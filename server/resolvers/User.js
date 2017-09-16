const User = require('../db/models').user

const userResolvers = {
  Query: {
    users: (_, args) => {
      return User.findAll()
    }
  }
}

module.exports = userResolvers
