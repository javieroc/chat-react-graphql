const Message = require('../db/models').message

const messageResolvers = {
  Query: {
    messages: (_, args) => {
      const messages = Message.findAll({
        include: [
          'user',
          'room'
        ]
      })

      return messages
    }
  }
}

module.exports = messageResolvers
