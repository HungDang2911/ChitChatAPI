const conversationsService = require('./conversationsService');
const usersService = require('../users/usersService');

module.exports.getUserConversations = async (req, res) => {
  const token = req.headers['authorization'];
  const userId = usersService.decodeToken(token)._id;

  try {
    const conversations = await conversationsService.getAllConversations(userId);
    res.json(conversations);
  } catch (err) {
    console.log(err);
  }
};

module.exports.createConversation = async (req, res) => {
  const token = req.headers['authorization'];
  const userId = usersService.decodeToken(token)._id;
  const { friendId, message } = req.body;

  message.sender = userId;

  try {
    await conversationsService.createNewConversationWithAMessage(
      userId,
      friendId,
      message
    );
    res.send();
  } catch (err) {
    res.status(500).send();
  }
};
