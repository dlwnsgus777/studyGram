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
        attributes: ["id", "nickname"]
      });
      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  });
  localStrategy();
};
