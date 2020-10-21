const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const userAPI = require("./api/components/users/usersAPI");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/users", userAPI);

module.exports = app;
