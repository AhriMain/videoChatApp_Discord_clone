import React from "react";
import { styled } from "@mui/material";
import PendingInvitationsListItem from "./PendingInvitationsListItem";
import { useSelector } from "react-redux";

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

const PendingInvitationsList = () => {
  const friendsInvitations = useSelector(
    (state) => state.friends?.pendingFriendsInvitations
  );
  console.log(friendsInvitations);
  return (
    <MainContainer>
      {friendsInvitations.map((invitation) => (
        <PendingInvitationsListItem
          key={invitation._id}
          id={invitation._id}
          username={invitation.senderId.username}
          mail={invitation.senderId.mail}
        />
      ))}
    </MainContainer>
  );
};

export default PendingInvitationsList;
