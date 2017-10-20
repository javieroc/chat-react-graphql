const Message = `
  type Messages {
    totalCount: Int!
    edges: [MessageEdge]!
    pageInfo: PageInfo!
  }

  type Message {
    id: ID!
    text: String
    user: User
    room: Room
    created_at: String
    updated_at: String
  }

  type MessageEdge {
    cursor: String!
    node: Message!
  }
`;

export default Message;
