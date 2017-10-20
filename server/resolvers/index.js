import { merge } from 'lodash';
import userResolvers from './User';
import roomResolvers from './Room';
import messageResolvers from './Message';

const resolvers = merge(userResolvers, roomResolvers, messageResolvers);

export default resolvers;
