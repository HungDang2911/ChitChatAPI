const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  sex: { type: Boolean, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  refreshTokens: [
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

module.exports = mongoose.model("User", userSchema);
