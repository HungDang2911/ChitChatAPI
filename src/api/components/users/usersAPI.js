const passport = require('passport');
const usersAPI = require('express').Router();
const usersController = require('./usersController');

usersAPI.post('/auth/register', usersController.register);
usersAPI.post('/auth/login', usersController.login);
usersAPI.post('/auth/token', usersController.token);
usersAPI.post('/auth/facebook', )

module.exports = usersAPI;