const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require('helmet');
const cors = require ('cors');

const userAPI = require("./api/components/users/usersAPI");

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/users", userAPI);

module.exports = app;
