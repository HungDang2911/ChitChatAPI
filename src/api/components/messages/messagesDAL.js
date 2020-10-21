const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  messageId: {
    type: String,
    required: true
  },
  sender: {
    type: Number,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Message", messageSchema);
