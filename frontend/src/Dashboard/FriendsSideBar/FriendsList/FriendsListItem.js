import { Button, Typography } from "@mui/material";
import React from "react";
import Avatar from "../../../shared/components/Avatar";
import OnlineIndicator from "./OnlineIndicator/OnlineIndicator";
import { useDispatch } from "react-redux";
import {
  setChosenChatDetails,
  chatTypes,
} from "../../../store/actions/chatActions";

const FriendsListItem = ({ id, username, isOnline }) => {
  const dispatch = useDispatch();

  const handleChooseActiveConversation = () => {
    setChosenChatDetails(
      dispatch,
      { id: id, name: username },
      chatTypes.DIRECT
    );
  };
  return (
    <Button
      onClick={handleChooseActiveConversation}
      style={{
        color: "black",
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        position: "relative",
      }}
    >
      {/* avatar is our component */}
      <Avatar username={username} />
      <Typography
        style={{ marginLeft: "7px", fontWeight: 700, color: "#8e9297" }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  );
};

export default FriendsListItem;
