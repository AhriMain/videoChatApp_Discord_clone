import React, { useEffect } from "react";
import { styled } from "@mui/material";
import Messages from "./Messages/Messages";
import NewMessageInput from "./NewMessageInput";
import { getDirectChatHistory } from "../../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
  flexGrow: 1,
});

const MessengerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    //fetching chat history for specific user id
    getDirectChatHistory(
      {
        receiverUserId: chosenChatDetails.id,
      },
      [chosenChatDetails]
    );
  });
  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  );
};

export default MessengerContent;
