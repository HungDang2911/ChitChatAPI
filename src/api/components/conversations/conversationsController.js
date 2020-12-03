const conversationsService = require("./conversationsService");

module.exports.getConversationById = async (req, res) => {
  const token = req.headers['authorization'];
  const userId = usersService.decodeToken(token)._id;

  try {
    const conversations = conversationsService.getAllConversations(userId);
    res.json(conversations);
  } catch (err) {
    console.log(err);
  }
};

