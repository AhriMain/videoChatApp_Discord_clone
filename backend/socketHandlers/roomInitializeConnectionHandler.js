const roomInitializeConnectionHandler = (socket, data) => {
  const { connUserSocketId } = data;
  console.log("jett", connUserSocketId);
  const initData = { connUserSocketId: socket.id };
  socket.to(connUserSocketId).emit("conn-init", initData);
};

module.exports = roomInitializeConnectionHandler;
