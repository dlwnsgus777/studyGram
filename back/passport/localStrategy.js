const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        try {
          const user = await db.User.findOne({
            where: {
              email: email
            }
          });
          if (!user) {
            return done(null, false, { message: "이메일이 없습니다." });
          }
          const hasPassword = await bcrypt.compare(password, user.password);
          if (hasPassword) {
            return done(null, user);
          } else {
            return done(null, false, { message: "비밀번호가 틀립니다" });
          }
        } catch (err) {
          console.log(err);
          return done(err);
        }
      }
    )
  );
};
