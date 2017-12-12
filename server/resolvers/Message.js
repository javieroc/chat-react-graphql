import { PubSub, withFilter } from 'graphql-subscriptions';
import { message, room } from '../db/models';

const pubsub = new PubSub();

const messageResolvers = {
  Query: {
    messages: async (_, args) => {
      const cursor = args.after ? Buffer.from(args.after, 'base64').toString('ascii') : 999999;
      const first = args.first ? args.first : 10;

      let { roomId } = args;
      if (!roomId) {
        const firstRoom = await room.findOne({
          order: [
            ['name', 'ASC'],
          ],
        });

        roomId = firstRoom.id;
      }

      const messages = await message.findAll({
        where: {
          room_id: roomId,
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
          room_id: roomId,
        },
      });

      // Calculate hasNextPage
      let hasNextPage = false;
      let endCursor = messages.length > 0 ? messages[messages.length - 1].id : '';
      if (endCursor) {
        const restRows = await message.count({
          where: {
            room_id: roomId,
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
  Mutation: {
    createMessage: async (parent, args, { user }) => {
      try {
        const { text } = args;
        let { roomId } = args;
        if (!roomId) {
          const firstRoom = await room.findOne({
            order: [
              ['name', 'ASC'],
            ],
          });

          roomId = firstRoom.id;
        }

        const messageCreated = await message.create({
          text,
          room_id: roomId,
          user_id: user.id,
        });

        const messageUser = await message.findOne({
          where: {
            id: messageCreated.id,
          },
          include: [
            'user',
            'room',
          ],
        });

        const payload = {
          cursor: Buffer.from(messageUser.id.toString()).toString('base64'),
          node: messageUser,
        };

        pubsub.publish('newRoomMessage', {
          newRoomMessage: payload,
        });

        return true;
      } catch (err) {
        throw err;
      }
    },
  },
  Subscription: {
    newRoomMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('newRoomMessage'),
        async (payload, args) => {
          let { roomId } = args;
          if (!roomId) {
            const firstRoom = await room.findOne({
              order: [
                ['name', 'ASC'],
              ],
            });

            roomId = firstRoom.id;
          }
          const { room_id } = payload.newRoomMessage.node;
          return room_id === parseInt(roomId, 10);
        },
      ),
    },
  },
};

export default messageResolvers;
