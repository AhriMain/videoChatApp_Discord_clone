import io from "socket.io-client";
import store from "../store/store";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsActions";
import { updateDirectChatHistoryIfActive } from "../shared/utils/updateDirectChatHistoryIfActive";
import * as roomHandler from "./roomHandler";
import * as webRTCHandler from "./webRTCHandler";

let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  socket = io("http://discordclone12.herokuapp.com", {
    auth: { token: jwtToken },
  });
  socket.on("connect", () => {});

  socket.on("friend-invitations", (data) => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });
  // for friends list
  socket.on("friend-list", (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });
  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });
  socket.on("direct-chat-history", (data) => {
    updateDirectChatHistoryIfActive(data);
  });
  socket.on("room-create", (data) => {
    roomHandler.newRoomCreated(data);
  });
  socket.on("active-rooms", (data) => {
    roomHandler.updateActiveRooms(data);
  });
  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;

    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;

    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });
  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });
  socket.on("room-participant-left", (data) => {
    webRTCHandler.handleParticipantLeftRoom(data);
  });
};

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket.emit("direct-chat-history", data);
};

export const createNewRoom = () => {
  socket.emit("room-create");
};

export const joinRoom = (data) => {
  socket.emit("room-join", data);
};

export const leaveRoom = (data) => {
  socket.emit("room-leave", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};
