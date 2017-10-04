const Room = require('../db/models').room
const Message = require('../db/models').message

const roomResolvers = {
  Query: {
    rooms: async (_, args) => {
      const cursor = args.after ? Buffer.from(args.after, 'base64').toString('ascii') : 'a'
      const first = args.first ? args.first : 10

      // Get rooms
      const rooms = await Room.findAll({
        where: {
          name: {
            $gt: cursor
          }
        },
        order: [
          ['name', 'ASC']
        ],
        limit: first,
        include: [
          'user',
          'messages'
        ]
      })

      // Wrap rooms into edges
      const edges = rooms.map((room) => {
        return {
          cursor: Buffer.from(room.name).toString('base64'),
          node: room
        }
      })

      // Get total rooms
      const totalCount = await Room.count()

      // Calculate hasNextPage
      let hasNextPage = false
      let endCursor = rooms.length > 0 ? rooms[rooms.length - 1].name : ''
      if (endCursor) {
        const restRows = await Room.count({
          where: {
            name: {
              $gt: endCursor
            }
          },
          order: [
            ['name', 'ASC']
          ]
        })
        endCursor = Buffer.from(endCursor).toString('base64')
        if (restRows > 0) {
          hasNextPage = true
        }
      }

      return {
        totalCount,
        edges,
        pageInfo: {
          endCursor,
          hasNextPage
        }
      }
    },
    room: async (_, args) => {
      const room = await Room.findOne({
        where: {
          id: args.id
        },
        include: [
          'user'
        ]
      })
      return room
    }
  },
  Room: {
    async messages(room, args) {
      const cursor = args.after ? Buffer.from(args.after, 'base64').toString('ascii') : 999999
      const first = args.first ? args.first : 10

      const messages = await Message.findAll({
        where: {
          room_id: room.id,
          id: {
            $lt: cursor
          }
        },
        limit: first,
        order: [
          ['id', 'DESC']
        ],
        include: [
          'user',
          'room'
        ]
      })

      const edges = messages.map((message) => {
        return {
          cursor: Buffer.from(message.id.toString()).toString('base64'),
          node: message
        }
      })

      const totalCount = await Message.count({
        where: {
          room_id: room.id
        }
      })

      // Calculate hasNextPage
      let hasNextPage = false
      let endCursor = messages.length > 0 ? messages[messages.length - 1].id : ''
      if (endCursor) {
        const restRows = await Message.count({
          where: {
            room_id: room.id,
            id: {
              $lt: endCursor
            }
          },
          order: [
            ['name', 'ASC']
          ]
        })
        endCursor = Buffer.from(endCursor.toString()).toString('base64')
        if (restRows > 0) {
          hasNextPage = true
        }
      }

      return {
        totalCount,
        edges,
        pageInfo: {
          endCursor,
          hasNextPage
        }
      }
    }
  }
}

module.exports = roomResolvers
