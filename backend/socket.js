const { addChatMessage } = require("./utils/chatHelper");
const socketHandler = (wsServer) => {
  const rooms = {};
  const onlineUsers = {};
  const socketIdToUserId = {};

  wsServer.on("connection", (socket) => {
    socket.on("connected", (userId) => {
      onlineUsers[userId] = socket.id;
    });
    socket.on("appointment_booked", (data) => {
      socket.to(onlineUsers[data.consultant]).emit("appointment_booked", data);
    });
    socket.on("disconnected_from_dashboard", (userId) => {
      delete onlineUsers[userId];
    });
    socket.on("join_meeting", (appointment) => {
      socket
        .to([onlineUsers[appointment.peerId]])
        .emit("join_meeting", appointment);
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
      const roomName = rooms[socket.id];

      delete rooms[socket.id];
      socket.to(roomName).emit("peer_left");
      delete onlineUsers[socketIdToUserId[socket.id]];
      delete socketIdToUserId[socket.id];
    });

    socket.on("meeting_ended", (roomName) => {
      socket.to(roomName).emit("meeting_ended");
    });

    socket.on("chat", (message, meetingId) => {
      addChatMessage(meetingId, message);

      socket.to(meetingId).emit("chat", message);
    });
  });
};

module.exports = socketHandler;
