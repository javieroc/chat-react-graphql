const Room = require('../db/models').room

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
    }
  }
}

module.exports = roomResolvers
