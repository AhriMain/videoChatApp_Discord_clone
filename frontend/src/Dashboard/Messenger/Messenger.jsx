import React from "react";
import { styled } from "@mui/material";
import { useSelector } from "react-redux";
import WelcomeMessage from "./WelcomeMessage";
import MessengerContent from "./MessengerContent";

const MainContainer = styled("div")({
  flexGrow: 1,
  marginTop: "48px",
  display: "flex",
  backgroundColor: "#36393f",
});

const Messenger = () => {
  const chosenChatDetails = useSelector(state=>state.chat.chosenChatDetails)
  return <MainContainer>{!chosenChatDetails ? (
        <WelcomeMessage />
      ) : (
        <MessengerContent chosenChatDetails={chosenChatDetails} />
      )}</MainContainer>;
};

export default Messenger;
