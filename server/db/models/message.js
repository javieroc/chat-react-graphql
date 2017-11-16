module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Message.associate = (models) => {
    Message.User = Message.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user',
    });

    Message.Room = Message.belongsTo(models.room, {
      foreignKey: 'room_id',
      as: 'room',
    });
  };

  return Message;
};
