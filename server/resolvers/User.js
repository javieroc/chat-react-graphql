import { user } from '../db/models';

const userResolvers = {
  Query: {
    users: () => user.findAll(),
  },
};

export default userResolvers;
