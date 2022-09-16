const User = require("../../models/user");
const Invitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;

  // this we get in jwt token
  const { userId, mail } = req.user;

  // check if sending to himself
  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    //status 409 is conflict so in frontend in catch it will be handled
    return res.status(409).send("Cannot send invite to yourself");
  }
  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  // check if the sender user exists
  if (!targetUser) {
    return res.status(404).send(`${targetMailAddress} not found`);
  }

  // check if invitation has been already sent
  const invitationAlreadyReceived = await Invitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send("Invitation has been already sent");
  }

  // check if users are already friends
  const usersAlreadyFriends = targetUser.friends.find(
    (friendsId) => friendsId.toString() === userId.toString()
  );
  if (usersAlreadyFriends) {
    return res.status(409).send("already friends");
  }

  // create new invitation in database
  const newInvitation = await Invitation.create({
    senderId: userId,
    recieverId: targetUser._id,
  });
  // send pending invitations update to recieved user
  friendsUpdates.updateFriendsPendingInvitation(targetUser._id.toString());
  return res.status(201).send("Invitation has been sent");
};

module.exports = postInvite;
