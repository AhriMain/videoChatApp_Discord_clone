const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdate = require("../../socketHandlers/updates/friends");
const User = require("../../models/user");

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;
    //  find particular invitation
    const invitation = await FriendInvitation.findById(id);
    if (!invitation) {
      return res.status(401).send("Error occured");
    }
    // destructure twofields from document
    const { senderId, recieverId } = invitation;

    // add ids of both users to both users friends array
    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, recieverId];
    const recieverUser = await User.findById(recieverId);
    recieverUser.friends = [...recieverUser.friends, senderId];

    //now save both document to db.
    await senderUser.save();
    await recieverUser.save();

    // now delete the invitation in db invitation collection
    await FriendInvitation.findByIdAndDelete(id);

    // update real time friends list to both users
    friendsUpdate.updateFriends(userId);
    friendsUpdate.updateFriends(recieverId);
    // update socket real time of friend Invitation if online
    friendsUpdate.updateFriendsPendingInvitation(userId);
    return res.status(200).send("Friend invite accepted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something wend wrong");
  }
};
module.exports = postAccept;
