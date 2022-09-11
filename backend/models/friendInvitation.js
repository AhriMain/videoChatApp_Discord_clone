const mongoose = require("mongoose");
const schema = mongoose.Schema;

const friendInvitationSchema = new schema(
  {
    senderId: {
      type: schema.Types.ObjectId,
      ref: "User",
    },
    recieverId: {
      type: schema.Types.ObjectId,
      ref: "User",
    },
  },
  { collection: "FriendInvitation" }
);

module.exports = mongoose.model("FriendInvitation", friendInvitationSchema);
