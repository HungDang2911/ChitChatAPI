const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  sex: { type: Boolean, required: true },
  username: { type: String, unique: true, required: true },
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
  friends: [ObjectId],
});

module.exports = mongoose.model('User', userSchema);
