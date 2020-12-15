const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const conversationSchema = mongoose.Schema({
  messages: [
    {
      sender: {
        type: ObjectId,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('Conversation', conversationSchema);
