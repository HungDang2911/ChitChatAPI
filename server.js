require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const redis = require('redis');
// const { RateLimiterRedis } = require('rate-limiter-flexible');
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
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
const conversationsService = require('./src/api/components/conversations/conversationsService');

var admin = require('firebase-admin');

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

io.on('connection', (socket) => {
  socket.on('saveUserInfo', (data) => {
    users[socket.id] = data;
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
  });

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
  });

  socket.on('chat', async (data) => {
    const { message, room } = data;

    const newMessage = await conversationsService.addMessageToConversation(
      room,
      message
    );

    console.log(newMessage);

    io.to(room).emit('chat', { message: newMessage, room });

    //push notification
    // var payload = {
    //   notification: {
    //     title: "This is a Notification",
    //     body: "This is the body of the notification message."
    //   }
    // };

    //  var options = {
    //   priority: "high",
    //   timeToLive: 60 * 60 *24
    // };
    // admin.messaging().sendToDevice(registrationToken, payload, option);
  });

  socket.on('sendFriendRequest', function (data) {
    users[data.friendId].socket.emit('receiveFriendRequest');
  });

  socket.on('acceptFriendRequest', function (data) {});
});

server.listen(port);
