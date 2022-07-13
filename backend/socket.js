const { emit } = require("nodemon");
const socketHandler = (wsServer) => {
  wsServer.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("join_room", (roomName, sid) => {
      console.log("Client joined room", roomName);

      // this will create a room

      socket.join(roomName);

      // console.log(socket.rooms[roomName]);

      socket.to(roomName).emit("welcome");
    });

    socket.on("offer", (offer, roomName) => {
      socket.to(roomName).emit("offer", offer);
    });

    socket.on("answer", (answer, roomName) => {
      // console.log("answer", answer);
      socket.to(roomName).emit("answer", answer);
    });

    socket.on("ice", (ice, roomName) => {
      // console.log("ice", ice);
      socket.to(roomName).emit("ice", ice);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      socket.emit("someone_left");
    });
  });
};

module.exports = socketHandler;
