const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const usersAPI = require('./api/components/users/usersAPI');
const conversationsAPI = require('./api/components/conversations/conversationsAPI');

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/users', usersAPI);
app.use('/conversations', conversationsAPI);

module.exports = app;
