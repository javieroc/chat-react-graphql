module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('room', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    limit: {
      type: DataTypes.INTEGER
    }
  })

  Room.associate = (models) => {
    Room.User = Room.belongsTo(models.user, {
      foreignKey: 'user_id'
    })

    Room.Messages = Room.hasMany(models.message, {
      foreignKey: 'room_id'
    })

    Room.RoomUsers = Room.hasMany(models.room_user, {
      foreignKey: 'room_id'
    })
  }

  return Room
}
