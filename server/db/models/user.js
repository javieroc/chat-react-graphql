export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  User.associate = (models) => {
    User.Messages = User.hasMany(models.message, {
      foreignKey: 'user_id',
    });

    User.Rooms = User.hasMany(models.room, {
      foreignKey: 'user_id',
    });

    User.RoomUsers = User.hasMany(models.room_user, {
      foreignKey: 'user_id',
    });
  };

  return User;
};
