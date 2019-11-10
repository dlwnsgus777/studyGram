module.exports = (sequelize, DataTypes) => {
  const Studycard = sequelize.define(
    "Studycard",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );
  Studycard.associate = db => {
    db.Studycard.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Studycard.belongsTo(db.User);
    db.Studycard.hasMany(db.Comment);
    db.Studycard.hasMany(db.Image);
    db.Studycard.belongsToMany(db.Hashtag, { through: "StudycardHashtag" });
  };
  return Studycard;
};
