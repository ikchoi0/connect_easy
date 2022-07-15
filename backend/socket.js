const socketHandler = (wsServer) => {
  const rooms = {};
  const socketToRoom = {};

  wsServer.on('connection', (socket) => {
    socket.on('join_room', (roomName) => {
      rooms[socket.id] = roomName;
      socket.join(roomName);
      socket.to(roomName).emit('welcome');
    });

    socket.on('offer', (offer, roomName) => {
      socket.to(roomName).emit('getOffer', offer);
    });

    socket.on('answer', (answer, roomName) => {
      socket.to(roomName).emit('getAnswer', answer);
    });

    socket.on('ice', (ice, roomName) => {
      socket.to(roomName).emit('getIce', ice);
    });

    socket.on('disconnect', () => {
      // console.log(socket.adapter);
      console.log('disconnected');
      const roomName = rooms[socket.id];
      delete rooms[socket.id];
      socket.to(roomName).emit('peer_left');
    });
  });
};

const activeRooms = {};
module.exports = socketHandler;
