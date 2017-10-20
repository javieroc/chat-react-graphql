import { room, message } from '../db/models';

const roomResolvers = {
  Query: {
    rooms: async (_, args) => {
      const cursor = args.after ? Buffer.from(args.after, 'base64').toString('ascii') : 'a';
      const first = args.first ? args.first : 10;

      // Get rooms
      const rooms = await room.findAll({
        where: {
          name: {
            $gt: cursor,
          },
        },
        order: [
          ['name', 'ASC'],
        ],
        limit: first,
        include: [
          'user',
          'messages',
        ],
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
    room: async (_, args) => {
      return room.findOne({
        where: {
          id: args.id,
        },
        include: [
          'user',
        ],
      });
    },
  },
  Room: {
    async messages(parent, args) {
      const cursor = args.after ? Buffer.from(args.after, 'base64').toString('ascii') : 999999;
      const first = args.first ? args.first : 10;

      const messages = await message.findAll({
        where: {
          room_id: parent.id,
          id: {
            $lt: cursor,
          },
        },
        limit: first,
        order: [
          ['id', 'DESC'],
        ],
        include: [
          'user',
          'room',
        ],
      });

      const edges = messages.map((elem) => {
        return {
          cursor: Buffer.from(elem.id.toString()).toString('base64'),
          node: elem,
        };
      });

      const totalCount = await message.count({
        where: {
          room_id: parent.id,
        },
      });

      // Calculate hasNextPage
      let hasNextPage = false;
      let endCursor = messages.length > 0 ? messages[messages.length - 1].id : '';
      if (endCursor) {
        const restRows = await message.count({
          where: {
            room_id: room.id,
            id: {
              $lt: endCursor,
            },
          },
          order: [
            ['name', 'ASC'],
          ],
        });
        endCursor = Buffer.from(endCursor.toString()).toString('base64');
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
};

export default roomResolvers;
