import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ChosenOptionLabel = () => {
  const name = useSelector((state) => state.chat.chosenChatDetails?.name);
  return (
    <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}>
      {name ? `chosen chat details: ${name}` : ""}
    </Typography>
  );
};

export default ChosenOptionLabel;
