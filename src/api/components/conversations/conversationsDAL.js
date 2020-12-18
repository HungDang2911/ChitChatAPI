const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const conversationSchema = mongoose.Schema({
  displayName: String,
  avatar: String,
  members: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
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
        type: Number,
        default: new Date(),
      },
    },
  ],
});

module.exports = mongoose.model('Conversation', conversationSchema);
