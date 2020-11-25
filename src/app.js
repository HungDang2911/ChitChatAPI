const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require('helmet');
const cors = require ('cors');

const usersAPI = require("./api/components/users/usersAPI");
const messagesAPI = require("./api/components/messages/messagesAPI");

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('OK')
})
app.use("/users", usersAPI);
// app.use("/messages", messagesAPI);

module.exports = app;
