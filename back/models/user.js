module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
  User.associate = db => {
    db.User.hasMany(db.Studycard);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Studycard, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      foreignKey: "followingId",
      as: "Followers"
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      foreignKey: "followerId",
      as: "Followings"
    });
  };
  return User;
};
