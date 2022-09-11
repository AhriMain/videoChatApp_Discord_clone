const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitation = async (userId) => {
  // check if userId and all his sockets is online or not.if online only then emit
  // to all his socketId

  try {
    const pendingInvitations = await FriendInvitation.find({
      recieverId: userId,
    }).populate("senderId", "_id username mail");

    // find if user of specified userId has active connections
    const receiverList = serverStore.getActiveConnections(userId);

    const io = serverStore.getSocketServerInstance();
    receiverList.forEach((recieverSocketId) => {
      io.to(recieverSocketId).emit("friend-invitations", {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const updateFriends = async (userId) => {
  try {
    // get user and only id and friends field and populate friends field ref with
    //  id username and mail
    const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
      "friends",
      "_id username mail"
    );

    //if user exists just return arraw with such objects
    if (user) {
      const friendsList = user.friends.map((f) => {
        return { id: f._id, mail: f.mail, username: f.username };
      });
      console.log(friendsList);
      // find active connections of specific id(online suers)
      const receiverList = serverStore.getActiveConnections(userId);
      // get io instance
      const io = serverStore.getSocketServerInstance();
      // emit
      receiverList.forEach((recieverSocketId) => {
        io.to(recieverSocketId).emit("friend-list", {
          friends: friendsList ? friendsList : [],
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateFriendsPendingInvitation, updateFriends };
