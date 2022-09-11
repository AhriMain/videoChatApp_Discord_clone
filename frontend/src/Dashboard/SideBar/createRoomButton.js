import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as roomHandler from "../../realtimeCommunication/roomHandler";

const createRoomButton = () => {
  const createNewRoomHandler = () => {
    // creating a room and sending this info to server
    // change redux store isUserInRoom and isUserRoomCreator to true,
    roomHandler.createNewRoom();
  };

  return (
    <Button
      onClick={createNewRoomHandler}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        padding: "0",
        margin: "0",
        minWidth: 0,
        marginTop: "10px",
        color: "white",
        backgroundColor: "#5865F2",
      }}
    >
      <AddIcon />
    </Button>
  );
};

export default createRoomButton;
