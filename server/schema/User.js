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

  type LoginResponse {
    user: User
    token: String
    refreshToken: String
  }

  input LoginData {
    email: String!
    password: String!
  }

  input RegisterData {
    username: String!
    email: String!
    password: String!
  }
`;

export default User;
