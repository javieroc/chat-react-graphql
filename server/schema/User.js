const User = `
  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String!
    rooms(
      first: Int!
      after: String
    ): Rooms
  }

  input NewUser {
    username: String!
    email: String!
    password: String!
    avatar: String!
  }
`;

export default User;
