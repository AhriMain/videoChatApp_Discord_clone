const Conversation = require("../models/conversation");
const chatUpdates = require("../socketHandlers/updates/chat");
const { updateFriends } = require("./updates/friends");

const directChatHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId } = data;
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
      type: "DIRECT",
    });
    if (conversation) {
      chatUpdates.updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (error) {}
};

module.exports = directChatHistoryHandler;
