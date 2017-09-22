const Room = `
  type Rooms {
    totalCount: Int!
    edges: [RoomEdge]!
    pageInfo: PageInfo!
  }

  type Room {
    id: ID!
    name: String!
    limit: Int
    user: User
    messages: [Message]
  }

  type RoomEdge {
    cursor: String!
    node: Room!
  }
`

module.exports = Room
