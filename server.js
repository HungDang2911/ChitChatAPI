require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once('open', () => {
  console.log('connected database');
});

// const redisClient = redis.createClient({
//   enable_offline_queue: false
// })

// const rateLimiter = new RateLimiterRedis({
//   storeClient: redisClient,
//   points: 20,
//   duration: 1,
//   blockDuration: 2,  
// })

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const options = {};
const io = require('socket.io')(server, options);
const handleMessageAndCall = require('./src/io');

io.on('connection', (socket) => {
  handleMessageAndCall(socket);
})

server.listen(port);
