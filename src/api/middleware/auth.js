const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const jwtToken = req.header.authorization.split(' ')[1];
    const facebookToken = req.header.facebookToken;
    const googleToken = req.header.googleToken;
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!")
    })
  }
}