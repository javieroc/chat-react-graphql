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
    messages(
      first: Int
      after: String
    ): Messages
  }

  type RoomEdge {
    cursor: String!
    node: Room!
  }
`;

export default Room;
