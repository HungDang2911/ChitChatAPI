// const mediasoup = require("mediasoup");

module.exports = (socket) => {
  socket.on('disconnect', () => console.log(`Disconnected: ${socket.id}`));

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
  });

  socket.on('chat', (data) => {
    const { message, room } = data;
    console.log(`msg: ${message}, room: ${room}`);
    socket.broadcast.to(room).emit('chat', message);
  });
};
