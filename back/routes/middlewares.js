exports.loginCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("로그인을 먼저 해야합니다.");
};

exports.notLoginCheck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("로그인 한 사람은 불가능합니다");
};
