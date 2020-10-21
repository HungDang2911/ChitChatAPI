const User = require('./usersDAL');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports.createUser = async (user) => {
  const { username, password } = user;
  const saltRounds = 10;

  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, password: encryptedPassword });
    user.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports.getUser = async (username) => {
}

module.exports.generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports.generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

module.exports.saveRefreshToken = (username, refreshToken) => {
  
}

module.exports.checkRefreshToken = (username, refreshToken) => {

}

module.exports.login = (user) => {};
