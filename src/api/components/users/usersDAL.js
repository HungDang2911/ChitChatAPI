const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  conversations: [ObjectId],
  refreshToken: [
    {
      token: String,
      validUntil: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
