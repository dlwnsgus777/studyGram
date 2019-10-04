const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const cookie = require("cookie-parser");
const morgan = require("morgan");

const userRouter = require("./routes/user");
const studyCardRouter = require("./routes/studycard");
const studyCardsRouter = require("./routes/studycards");

const db = require("./models");
const Mypassport = require("./passport");

const app = express();

db.sequelize.sync({ force: false });
Mypassport();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use("/", express.static("uploads"));
app.use(express.json());
app.use(cookie("studyGramSecert"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "studyGramSecert",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("접속완료 시작해보자");
});

app.use("/user", userRouter);
app.use("/studycard", studyCardRouter);
app.use("/studycards", studyCardsRouter);

app.listen(3001, () => {
  console.log(`백엔드 서버 포트 ${3001}번`);
});
