const Room = require('../db/models').room

const roomResolvers = {
  Query: {
    rooms: (_, args) => {
      return Room.findAll()
    }
  }
}

module.exports = roomResolvers
