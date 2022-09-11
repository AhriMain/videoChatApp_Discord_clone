const serverStore = require("../serverStore");
const friendsUpdate = require("./updates/friends");
const roomsUpdate = require("./updates/rooms");
const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // update pending frirends invitations list
  friendsUpdate.updateFriendsPendingInvitation(userDetails.userId);

  // update friends-list when newly connected to socket
  friendsUpdate.updateFriends(userDetails.userId);

  // update all activeRooms at initial connect
  setTimeout(() => {
    roomsUpdate.updateRooms(socket.id);
  }, [500]);
};

module.exports = newConnectionHandler;
