const Message = require('../db/models').message

const messageResolvers = {
  Query: {
    messages: async (_, args) => {
      const cursor = args.after ? Buffer.from(args.after, 'base64').toString('ascii') : 999999
      const first = args.first ? args.first : 10
      const roomId = args.roomId ? args.roomId : 1

      const messages = await Message.findAll({
        where: {
          room_id: roomId,
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
          room_id: roomId
        }
      })

      // Calculate hasNextPage
      let hasNextPage = false
      let endCursor = messages.length > 0 ? messages[messages.length - 1].id : ''
      if (endCursor) {
        const restRows = await Message.count({
          where: {
            room_id: roomId,
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

module.exports = messageResolvers
