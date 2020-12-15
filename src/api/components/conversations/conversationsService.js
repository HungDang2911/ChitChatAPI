const Conversation = require('./conversationsDAL');
const User = require('../users/usersDAL');

module.exports.getAllConversations = async (userId) => {
  try {
    const user = await User.findById(userId, 'conversations')
      .populate({
        path: 'conversations',
        select: '_id messages',
      })
      .exec();
    return user.conversations;
  } catch (err) {
    console.log(err);
  }
};

module.exports.addMessageToConversation = async (conversationId, message) => {
  try {
    await Conversation.findOneAndUpdate(
      { _id: conversationId },
      {
        $push: { messages: message },
      },
      { upsert: true }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports.createNewConversationWithAMessage = async (
  user1Id,
  user2Id,
  message
) => {
  try {
    const newConversation = new Conversation({
      messages: [message],
    });
    const newConversationId = (await newConversation.save())._id;

    // update user1

    //push new conversation
    const user1 = await User.findById(user1Id);
    user1.conversations.push(newConversationId);

    //set chatted to true
    const user2Idx = user1.friends.findIndex(
      (friend) => friend.info == user2Id
    );
    user1.friends[user2Idx].chatted = true;
    await user1.save();

    // update user2

    //push new conversation
    const user2 = await User.findById(user2Id);
    user2.conversations.push(newConversationId);

    //set chatted to true
    const user1Idx = user2.friends.findIndex(
      (friend) => friend.info == user1Id
    );
    user2.friends[user1Idx].chatted = true;
    await user2.save();
  } catch (err) {
    console.log(err);
  }
};
