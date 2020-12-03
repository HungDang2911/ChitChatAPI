const usersService = require('./usersService');

module.exports.register = async (req, res) => {
  const user = req.body;
  try {
    await usersService.createUser(user);
    res.status(200).send();
  } catch (error) {
    console.log(error)
    res.status(422).send(error);
  }
};

module.exports.login = async (req, res) => {
  const user = req.body;
  try {
    const { validationError } = await usersService.checkUsernameAndPassword(user);

    if (validationError) res.status(422).send(validationError);

    const accessToken = usersService.generateAccessToken(user);
    const refreshToken = usersService.generateRefreshToken(user);
    usersService.saveRefreshToken(user.username, refreshToken);
    res.status(200).json({ accessToken, refreshToken });
  } catch(error) {
    console.log(error);
  }
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
