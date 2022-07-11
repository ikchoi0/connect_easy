const socketHandler = (wsServer) => {
  wsServer.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("join_room", (roomName) => {
      console.log("Client joined room", roomName);
      // this will create a room
      socket.join(roomName);
      socket.to(roomName).emit("welcome");
    });

    socket.on("offer", (offer, roomName) => {
      socket.to(roomName).emit("offer", offer);
    });

    socket.on("answer", (answer, roomName) => {
      socket.to(roomName).emit("answer", answer);
    });

    socket.on("ice", (ice, roomName) => {
      socket.to(roomName).emit("ice", ice);
    });
  });
};

module.exports = socketHandler;
