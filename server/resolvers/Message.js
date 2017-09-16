const Message = require('../db/models').message

const messageResolvers = {
  Query: {
    messages: (_, args) => {
      return Message.findAll()
    }
  }
}

module.exports = messageResolvers
