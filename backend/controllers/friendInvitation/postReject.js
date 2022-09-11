const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdate = require("../../socketHandlers/updates/friends");

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    // remove that invitation from db
    const invitationExists = await FriendInvitation.exists({ _id: id });
    if (invitationExists) {
      await FriendInvitation.findByIdAndDelete(id);
      // real time update of pending invitations
    }
    friendsUpdate.updateFriendsPendingInvitation(userId);
    return res.status(200).send("Rejected");
  } catch (error) {
    console.log(error);
    return res.status(500).send("something wend wrong");
  }
};
module.exports = postReject;
