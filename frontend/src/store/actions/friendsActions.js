import { openAlertMessage } from "./alertActions";
import * as api from "../../api";

export const friendsActions = {
  SET_FRIENDS: "FRIENDS.SET_FRIENDS",
  SET_PENDING_FRIENDS_INVITATION: "FRIENDS.SET_PENDING_FRIENDS_INVITATIONS",
  SET_ONLINE_USERS: "FRIENDS.SET_ONLINE_USERS",
};

// action generator for friend invitation
export const sendFriendInvitation = async (
  dispatch,
  data,
  closeDialogHandler
) => {
  const response = await api.sendFriendInvitation(data);
  if (response.error) {
    openAlertMessage(dispatch, response.exception?.response?.data);
  } else {
    openAlertMessage(dispatch, "Invitation has been sent");
    closeDialogHandler(); //closes the dialog box
  }
};

// friend accept
export const acceptFriendInvitation = async (dispatch, data) => {
  const response = await api.acceptFriendInvitation(data);

  if (response.error) {
    openAlertMessage(dispatch, response.exception?.response?.data);
  } else {
    openAlertMessage(dispatch, "Invitations accepted");
  }
};

// friend reject
export const rejectFriendInvitation = async (dispatch, data) => {
  const response = await api.rejectFriendInvitation(data);
  if (response.error) {
    openAlertMessage(dispatch, response.exception?.response?.data);
  } else {
    openAlertMessage(dispatch, "Invitations rejected");
  }
};

// get pending Friends Invitation from server and set to redux store
export const setPendingFriendsInvitations = (pendingFriendsInvitations) => {
  return {
    type: friendsActions.SET_PENDING_FRIENDS_INVITATION,
    pendingFriendsInvitations,
  };
};

// friends list from server and set to redux store
export const setFriends = (friends) => {
  return {
    type: friendsActions.SET_FRIENDS,
    friends,
  };
};

// all online users from server and set to redux store
export const setOnlineUsers = (onlineUsers) => {
  return {
    type: friendsActions.SET_ONLINE_USERS,
    onlineUsers,
  };
};
