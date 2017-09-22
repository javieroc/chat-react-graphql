const Message = `
  type Message {
    id: ID!
    text: String
    user: User
    room: Room
    created_at: String
    updated_at: String
  }
`

module.exports = Message
