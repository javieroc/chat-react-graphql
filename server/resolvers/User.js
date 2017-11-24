import models, { user, room } from '../db/models';
import utils from '../utils';

const userResolvers = {
  Query: {
    users: () => user.findAll(),
    user: async (parent, args) => user.findOne({
      where: {
        id: args.id,
      },
    }),
  },
  User: {
    async rooms(parent, args) {
      const cursor = args.after ? Buffer.from(args.after, 'base64').toString('ascii') : 'a';
      const first = args.first ? args.first : 10;

      const rooms = await room.findAll({
        where: {
          user_id: parent.id,
          name: {
            $gt: cursor,
          },
        },
        order: [
          ['name', 'ASC'],
        ],
        limit: first,
      });

      // Wrap rooms into edges
      const edges = rooms.map((elem) => {
        return {
          cursor: Buffer.from(elem.name).toString('base64'),
          node: elem,
        };
      });
      // Get total rooms
      const totalCount = await room.count();

      // Calculate hasNextPage
      let hasNextPage = false;
      let endCursor = rooms.length > 0 ? rooms[rooms.length - 1].name : '';
      if (endCursor) {
        const restRows = await room.count({
          where: {
            name: {
              $gt: endCursor,
            },
          },
          order: [
            ['name', 'ASC'],
          ],
        });
        endCursor = Buffer.from(endCursor).toString('base64');
        if (restRows > 0) {
          hasNextPage = true;
        }
      }

      return {
        totalCount,
        edges,
        pageInfo: {
          endCursor,
          hasNextPage,
        },
      };
    },
  },
  Mutation: {
    signUp: async (parent, { newUser }) => {
      try {
        const { username, email, password } = newUser;
        const hashedPassword = await utils.encryptPassword(password);
        const avatar = `https://robohash.org/${username}/?size=200x200`;

        const userCreated = await user.create({
          username,
          email,
          password: hashedPassword,
          avatar,
        });

        return userCreated;
      } catch (err) {
        const errors = utils.formatErrors(err, models);
        throw errors;
      }
    },
  },
};

export default userResolvers;
