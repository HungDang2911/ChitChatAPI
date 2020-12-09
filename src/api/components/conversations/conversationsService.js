const Conversation = require('./conversationsDAL');
const User = require('../users/usersDAL');

module.exports.getAllConversations = async (userId) => {
  try {
    const conversations = await User.findById(userId)
      .populate('conversations')
      .exec();
    return conversations;
  } catch (err) {
    console.log(err);
  }
};

module.exports.addMessageToConversation = async (conversationId, message) => {
  try {
    await Conversation.findOneAndUpdate(
      conversationId,
      {
        $push: { messages: message },
      },
      { upsert: true }
    );
  } catch (err) {
    console.log(err);
  }
};
