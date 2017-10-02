module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('room_users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    state: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    room_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'id'
      }
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('room_users')
}
