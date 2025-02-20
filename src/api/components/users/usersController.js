const usersService = require('./usersService');

module.exports.register = async (req, res) => {
  const user = req.body;
  try {
    await usersService.createUser(user);
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
};

module.exports.login = async (req, res) => {
  const user = req.body;
  try {
    const { validationError } = await usersService.checkUsernameAndPassword(
      user
    );

    if (validationError) return res.status(422).send(validationError);

    const userId = (await usersService.getOneUserByUsername(user.username))._id;

    user._id = userId;

    const accessToken = usersService.generateAccessToken(user);
    const refreshToken = usersService.generateRefreshToken(user);
    usersService.saveRefreshToken(user.username, refreshToken);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
  }
};

module.exports.searchUser = async (req, res) => {
  const token = req.headers['authorization'];
  const userId = usersService.decodeToken(token)._id;
  const username = req.query.username;
  const records = await usersService.getUsersByUsername(userId, username);

  res.send(records);
};

module.exports.getAccessToken = (req, res) => {
  const { username, refreshToken } = req.body;
  if (usersService.checkRefreshToken(username, refreshToken)) {
  } else {
    res.status(401);
  }
};

module.exports.rejectToken = (req, res) => {
  const { username } = req.body;
  //FIND USER AND DELETE ALL REFRESH TOKENS
};

module.exports.getOneUserByUsername = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await usersService.getOneUserByUsername(username);
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.acceptFriendRequest = async (req, res) => {
  const token = req.headers['authorization'];
  const userId = usersService.decodeToken(token)._id;
  const friendId = req.body.friendId;
  try {
    await usersService.acceptFriendRequest(userId, friendId);
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
};

module.exports.getFriends = async (req, res) => {
  const token = req.headers['authorization'];
  const userId = usersService.decodeToken(token)._id;
  try {
    const friends = await usersService.getFriends(userId);
    res.json(friends);
  } catch (err) {
    res.status(500).send();
  }
};

module.exports.editProfile = async (req, res) => {
  const token = req.headers['authorization'];
  const userId = usersService.decodeToken(token)._id;
  const newUserInfo = req.body;

  try {
    await usersService.editUser(userId, newUserInfo);
    res.send();
  } catch (err) {
    res.status(500).send();
  }
};

module.exports.saveFCMToken = async (req, res) => {
  const token = req.headers['authorization'];
  const userId = usersService.decodeToken(token)._id;
  const fcmToken = req.body;

  try {
    await usersService.editUser(userId, fcmToken);
    res.send();
  } catch (err) {
    res.status(500).send();
  }
};

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
