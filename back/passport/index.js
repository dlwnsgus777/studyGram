const passport = require("passport");
const localStrategy = require("./localStrategy");
const db = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: {
          id: id
        },
        attributes: ["id", "nickname"],
        include: [
          {
            model: db.User,
            as: "Followings",
            attributes: ["id"]
          },
          {
            model: db.User,
            as: "Followers",
            attributes: ["id"]
          }
        ]
      });
      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  });
  localStrategy();
};
