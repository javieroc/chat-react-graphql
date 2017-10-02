const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers')
const User = require('./User')
const Room = require('./Room')
const Message = require('./Message')
const CommonTypes = require('./CommonTypes')

const rootQuery = `
  type Query {
    users: [User]

    rooms(
      # Amount of rows to fetch
      first: Int!

      # Get records after this cursor
      after: String
    ): Rooms

    room(
      id: Int!
    ): Room

    messages: [Message]
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, User, Room, Message, CommonTypes],
  resolvers
})

module.exports = schema
