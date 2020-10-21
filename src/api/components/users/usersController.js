const usersService = require('./usersService');

module.exports.register = (req, res) => {
  const user = req.body;
  usersService.createUser(user);
  // usersService.login(user);
};

module.exports.login = (req, res) => {
  const user = req.body;
  const accessToken = usersService.generateAccessToken(user);
  const refreshToken = usersService.generateRefreshToken(user);
  usersService.saveRefreshToken(user.username, refreshToken);
  res.json({ accessToken, refreshToken });
};

module.exports.token = (req, res) => {
  const { username, refreshToken } = req.body;
  if (usersService.checkRefreshToken(username, refreshToken)) {
  } else {
    res.status(401);
  }
};

module.exports.rejectToken = (req, res) => {
  const { username, refreshToken } = req.body;
  //FIND USER AND DELETE ALL REFRESH TOKENS
}

const authenticateToken = (req, res, next) => {
  console.log(req.headers);
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  // if (token == null) return res.status(401);

  // try {
  //   res.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  // } catch (err) {
  //   res.status(403);
  // }

  next();
};
