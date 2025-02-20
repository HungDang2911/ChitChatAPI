const User = require('./usersDAL');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const FRIEND_STATUS = {
  FRIEND: 1,
  NOT_FRIEND: -1,
  REQUEST_SENT: 0,
};

module.exports.createUser = async (user) => {
  const { password } = user;
  const saltRounds = 10;

  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ ...user, password: encryptedPassword });
    newUser.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports.getOneUserByUsername = async (username) => {
  try {
    const user = await User.findOne(
      { username },
      '-password -refreshTokens -conversations -friendRequests -friends -__v -sex'
    );
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports.getUsersByUsername = async (userId, username) => {
  try {
    const records = await User.find(
      { username: new RegExp(username, 'i') },
      '-password -refreshTokens -conversations -friendRequests -friends -__v'
    );
    const user = await User.findById(userId, 'friends _id').populate({
      path: 'friends.info',
      select: '_id',
    });
    records.forEach((record) => {
      // console.log(record);
      // if (user.friends.includes(record.info._id))
      //   record.isFriend = FRIEND_STATUS.FRIEND;
    });
    // return records.filter((record) => record._id == user._id);
    // console.log(records);

    const result = records.filter((record) => record._id != userId);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports.generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

module.exports.generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

module.exports.saveRefreshToken = async (username, refreshToken) => {
  try {
    await User.updateOne({ username }, { refreshTokens: [] });
  } catch (err) {
    console.log(err);
  }
};

module.exports.checkRefreshToken = async (username, refreshToken) => {
  const userRefreshTokens = (await User.findOne({ username })).refreshTokens;
};

module.exports.deleteUserRefreshTokens = async (username) => {
  try {
    await User.updateOne({ username }, { refreshTokens: [] });
  } catch (err) {}
};

module.exports.decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports.acceptFriendRequest = async (userId, friendId) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { friends: { info: friendId } },
    });
    await User.findByIdAndUpdate(friendId, {
      $push: { friends: { info: userId } },
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getFriends = async (userId) => {
  try {
    const user = await User.findById(userId, 'friends').populate({
      path: 'friends.info',
      select: '_id fullName email username avatar',
    });

    return user.friends;
  } catch (err) {
    console.log(err);
  }
};

module.exports.checkUsernameAndPassword = async (user) => {
  const { username, password } = user;
  let validationError;

  try {
    const user = await User.findOne({ username });
    if (!user) validationError = 'No users match that username.';
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) validationError = 'Wrong password';

    return { validationError };
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllConversations = async (userId) => {
  try {
    const conversations = User.findById(userId, 'conversations').populate(
      'conversations'
    );
    return conversations;
  } catch (err) {
    console.log(err);
  }
};

module.exports.editUser = async (userId, newUserInfo) => {
  try {
    await User.findByIdAndUpdate(userId, newUserInfo);
  } catch (err) {
    console.log(err);
  }
};
