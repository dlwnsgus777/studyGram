const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models");
const passport = require("passport");
const { notLoginCheck } = require("./middlewares");
const { loginCheck } = require("./middlewares");

router.get("/", loginCheck, async (req, res, next) => {
  const user = req.user;
  res.json(user);
});

router.post("/", notLoginCheck, async (req, res, next) => {
  try {
    const loadUser = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (loadUser) {
      // 400번 대는 클라이언트에 거절
      return res.status(403).send("이미 있는 이메일입니다.");
    }
    const loadNick = await db.User.findOne({
      where: {
        nickname: req.body.nickname
      }
    });
    if (loadNick) {
      return res.status(403).send("이미 있는 닉네임입니다.");
    }
    const secretPassword = await bcrypt.hash(req.body.password, 10);
    const createUser = await db.User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: secretPassword
    });
    // 201은 성공적으로 생성되었다
    res.status(201).json({
      id: createUser.id,
      nickname: createUser.nickname
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/login", notLoginCheck, (req, res, next) => {
  passport.authenticate("local", (err, user, fail) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (fail) {
      console.log(fail.message);
      // 400번대는 거절
      return res.status(401).send(fail.message);
    }
    return req.logIn(user, async err => {
      try {
        if (err) {
          console.log(err);
          return next(err);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          attributes: ["id", "email", "nickname"],
          include: [
            {
              model: db.Studycard,
              attributes: ["id"]
            },
            {
              model: db.User,
              as: "Followings",
              attributes: ["id", "nickname"]
            },
            {
              model: db.User,
              as: "Followers",
              attributes: ["id", "nickname"]
            }
          ]
        });
        return res.json(fullUser);
      } catch (error) {
        console.error("여기냐", error);
      }
    });
  })(req, res, next);
});

router.post("/logout", loginCheck, (req, res) => {
  if (req.isAuthenticated()) {
    req.logOut();
    req.session.destroy();
    return res.status(200).send("로그아웃 성공");
  }
});

router.post("/:id/follow", loginCheck, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });
    await user.addFollowing(req.params.id);
    res.send(req.params.id);
  } catch (error) {
    console.log(error);
    next(e);
  }
});

router.delete("/:id/follow", loginCheck, async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: req.user.id
      }
    });
    await user.removeFollowing(req.params.id);
    res.send(req.params.id);
  } catch (error) {
    console.log(err);
    next(e);
  }
});

router.patch("/nickname", loginCheck, async (req, res, next) => {
  try {
    await db.User.update(
      {
        nickname: req.body.nickname
      },
      {
        where: {
          id: req.user.id
        }
      }
    );
    res.send(res.body.nickname);
  } catch (error) {
    console.log(err);
    next(e);
  }
});

module.exports = router;
