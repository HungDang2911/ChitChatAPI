const Conversation = require('./conversationsDAL');
const User = require('../users/usersDAL');

module.exports.getAllConversations = async (userId) => {
  try {
    const user = await User.findById(userId, 'conversations')
      .populate({
        path: 'conversations',
        select: '_id members messages avatar displayName',
        populate: {
          path: 'members',
          select: '_id fullName username avatar',
        },
      })
      .exec();

    // If conversation is a 2-member conversation, set the other user info to conversation info
    user.conversations.forEach((conversation) => {
      if (conversation.members.length === 2) {
        const theOtherUser = conversation.members.find(
          (member) => member._id != userId
        );
        conversation.avatar = theOtherUser.avatar;
        conversation.displayName = theOtherUser.fullName;
      }
    });
    return user.conversations;
  } catch (err) {
    console.log(err);
  }
};

module.exports.addMessageToConversation = async (conversationId, message) => {
  try {
    const conversation = await Conversation.findOneAndUpdate(
      { _id: conversationId },
      {
        $push: { messages: message },
      },
      { upsert: true, new: true }
    );
    return conversation.messages[conversation.messages.length - 1];
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
      members: [user1Id, user2Id],
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
