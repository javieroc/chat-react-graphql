const casual = require('casual')
const Message = require('../models').message
const RoomUser = require('../models').room_user

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const disctictMessages = await Message.findAll({
      attributes: [
        Sequelize.literal('DISTINCT ON("user_id") user_id'),
        'id',
        'user_id',
        'room_id'
      ],
    })

    const promises = disctictMessages.map((elem) => {
      let message = elem.get()
      return RoomUser.create({
        state: 'active',
        user_id: message.user_id,
        room_id: message.room_id
      })
    })

    return Promise.all(promises)
  },

  down: (queryInterface, Sequelize) => {

  }
}
