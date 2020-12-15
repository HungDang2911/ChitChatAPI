const conversationsAPI = require('express').Router();
const conversationsController = require('./conversationsController');

conversationsAPI.post('/', conversationsController.createConversation);
conversationsAPI.get('/', conversationsController.getUserConversations);

module.exports = conversationsAPI;
