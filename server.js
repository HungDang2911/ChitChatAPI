require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once('open', () => {
  console.log('connected database');
});

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
