const Room = require('../db/models').room

const roomResolvers = {
  Query: {
    rooms: async (_, args) => {
      const rooms = await Room.findAll({
        include: [
          'user',
          'messages'
        ]
      })

      return rooms
    }
  }
}

module.exports = roomResolvers
