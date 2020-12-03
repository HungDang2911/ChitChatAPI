const Conversation = require('./conversationsDAL');

module.exports.getConversationById = async (conversationId) => {
  try {
    const conversation = Conversation.findById(conversationId);
    return conversation;
  } catch (err) {
    console.log(err);
  }
};

module.exports.addMessageToConversation = async (conversationId, message) => {
  try {
    Conversation.findOneAndUpdate(conversationId, {
      $push: { messages: message },
    });
  } catch (err) {
    console.log(err);
  }
};
