import React from "react";
import { styled } from "@mui/material";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./createRoomButton";
import ActiveRoomButton from "./ActiveRoomButton";
import {useSelector} from 'react-redux'

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

const SideBar = () => {
const activeRooms = useSelector(state=>state.room.activeRooms)
const isUserInRoom = useSelector(state=>state.room.isUserInRoom)
  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton />
      {activeRooms.map(room=>(
        <ActiveRoomButton roomId={room.roomId}
        creatorUsername={room.creatorUsername}
        amountOfParticipants={room.participants.length}
        key={room.roomId}
        isUserInRoom={isUserInRoom}
        />
      ))}
    </MainContainer>
  );
};

export default SideBar;
