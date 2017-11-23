import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolvers';
import User from './User';
import Room from './Room';
import Message from './Message';
import CommonTypes from './CommonTypes';

const rootQuery = `
  type Query {
    users: [User]

    user(
      id: Int!
    ): User

    rooms(
      # Amount of rows to fetch
      first: Int!

      # Get records after this cursor
      after: String
    ): Rooms

    room(
      id: Int!
    ): Room

    messages(
      roomId: Int
      first: Int!
      after: String
    ): Messages
  }

  type Mutation {
    signUp(newUser: NewUser!): User
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, User, Room, Message, CommonTypes],
  resolvers,
});

export default schema;
