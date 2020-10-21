const usersAPI = require("express").Router();
const usersController = require("./usersController");

usersAPI.post("/register", usersController.register);
usersAPI.post("/login", usersController.login);
usersAPI.post("/token", usersController.token);

module.exports = usersAPI;
