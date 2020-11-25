// const mediasoup = require("mediasoup");

module.exports = socket => {
  socket.on("sendMessagePrivate", data => {
    console.log(data)
  });
  socket.on("sendMessageGroup", data => {

  })
  socket.on("callPrivate", data => {

  });
  socket.on("callGroup", data => {

  })
}