const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers')
const User = require('./User')
const Room = require('./Room')
const Message = require('./Message')

const rootQuery = `
  type Query {
    users: [User]
    rooms: [Room]
    messages: [Message]
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, User, Room, Message],
  resolvers
})

module.exports = schema
