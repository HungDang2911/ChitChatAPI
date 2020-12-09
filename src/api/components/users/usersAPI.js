const usersAPI = require("express").Router();
const usersController = require("./usersController");

usersAPI.post("/register", usersController.register);
usersAPI.post("/login", usersController.login);
usersAPI.post("/token", usersController.getAccessToken);
usersAPI.post("/friends", usersController.acceptFriendRequest);
usersAPI.post("/search", usersController.searchUser);
usersAPI.get("/friends", usersController.getFriends);

module.exports = usersAPI;
