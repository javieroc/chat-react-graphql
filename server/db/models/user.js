module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [5, 20],
          msg: 'The username needs to be between 5 and 20 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid Email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
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
