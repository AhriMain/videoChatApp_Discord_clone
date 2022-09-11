const serverStore = require("../serverStore");
const roomLeaveHandler = require("./roomLeaveHandler");
const roomUpdate = require("./updates/rooms");

const disconnectHandler = (socket) => {
  const activeRooms = serverStore.getActiveRooms();
  activeRooms.forEach((activeRoom) => {
    const userInRoom = activeRoom.participants.some(
      (participant) => participant.socketId === socket.id
    );
    if (userInRoom) {
      roomLeaveHandler(socket, { roomId: activeRoom.roomId });
      roomUpdate.updateRooms();
    }
  });
  serverStore.removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;
