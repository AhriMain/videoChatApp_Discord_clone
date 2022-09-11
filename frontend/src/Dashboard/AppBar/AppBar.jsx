import React from "react";
import { styled } from "@mui/material";
import DropdownMenu from "./DropdownMenu";
import ChosenOptionLabel from "./ChosenOptionLabel";

const MainContainer = styled("div")({
  position: "absolute",
  right: "0px",
  top: "0px",
  height: "48px",
  width: "calc(100% - 326px)",
  borderBottom: "1px solid black",
  backgroundColor: "#36393f",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
});

const AppBar = () => {
  return (
    <MainContainer>
      <ChosenOptionLabel />
      <DropdownMenu />
    </MainContainer>
  );
};

export default AppBar;
