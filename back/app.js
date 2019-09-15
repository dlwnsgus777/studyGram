const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("접속완료");
});

app.listen(3001, () => {
  console.log(`백엔드 서버 포트 ${3001}번`);
});
