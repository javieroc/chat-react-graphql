const Room = `
  type Room {
    id: ID!
    name: String!
    limit: Int
    owner: User
    guests: [User]
    messages: [Message]
  }
`

module.exports = Room
