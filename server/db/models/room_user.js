module.exports = (sequelize, DataTypes) => {
  const RoomUser = sequelize.define('room_user', {
    state: {
      type: DataTypes.STRING,
    },
  });

  RoomUser.associate = (models) => {
    RoomUser.User = RoomUser.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user',
    });

    RoomUser.Room = RoomUser.belongsTo(models.room, {
      foreignKey: 'room_id',
    });
  };

  return RoomUser;
};
