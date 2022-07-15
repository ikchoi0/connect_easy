const socketHandler = (wsServer) => {
  const rooms = {};
  const onlineUsers = {};
  wsServer.on("connection", (socket) => {
    socket.on("connected", (userId) => {
      console.log("connected to server: " + userId);
      onlineUsers[userId] = socket.id;
    });
    socket.on("appointment_booked", (data) => {
      socket.to(onlineUsers[data.consultant]).emit("appointment_booked", data);
    });
    socket.on("disconnected_from_dashboard", (userId) => {
      console.log("disconnected from dashboard: " + userId);
      delete onlineUsers[userId];
    });
    socket.on("join_room", (roomName) => {
      rooms[socket.id] = roomName;
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

    socket.on("disconnect", () => {
      // console.log(socket.adapter);
      console.log("disconnected");
      const roomName = rooms[socket.id];
      delete rooms[socket.id];
      socket.to(roomName).emit("peer_left");
    });
    socket.on("meeting_ended", () => {
      const roomName = rooms[socket.id];
      socket.to(roomName).emit("meeting_ended");
    });
    socket.on("chat", (message) => {
      // console.log(message);
      const roomName = rooms[socket.id];
      socket.to(roomName).emit("chat", message);
    });
  });
};

module.exports = socketHandler;
