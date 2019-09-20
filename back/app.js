const express = require("express");
const db = require("./models");
const cors = require("cors");
const bcrypt = require("bcrypt");
const Mypassport = require("./passport");
const passport = require("passport");
const session = require("express-session");
const cookie = require("cookie-parser");
const morgan = require("morgan");

const app = express();

db.sequelize.sync({ force: true });
Mypassport();

app.use(morgan("dev"));
app.use(cors("http://localhost:3000"));
app.use(express.json());
app.use(cookie("studyGramSecert"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "studyGramSecert"
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("접속완료 시작해보자");
});

app.post("/user", async (req, res, next) => {
  try {
    const loadUser = await db.User.findOne({
      email: req.body.email
    });
    if (loadUser) {
      // 400번 대는 클라이언트에 거절
      return res.status(403).send("이미 있는 이메일입니다.");
    }
    const loadNick = await db.User.findOne({
      nickname: req.body.nickname
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
    res.status(201).json(createUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.post("/login", (req, res) => {
  req.body.email, req.body.password;
});

app.listen(3001, () => {
  console.log(`백엔드 서버 포트 ${3001}번`);
});
