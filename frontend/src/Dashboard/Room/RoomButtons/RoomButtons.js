import React from "react";
import styled from "@emotion/styled";
import CameraButton from "./CameraButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import ScreenShareButton from "./ScreenShareButton";
import { useSelector, useDispatch } from "react-redux";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RoomButtons = () => {
  const dispatch = useDispatch();
  const localStream = useSelector((state) => state.room.localStream);
  const audioOnly = useSelector((state) => state.room.audioOnly);

  return (
    <MainContainer>
      {!audioOnly && (
        <ScreenShareButton dispatch={dispatch} localStream={localStream} />
      )}
      <MicButton localStream={localStream} />
      <CloseRoomButton />
      {!audioOnly && <CameraButton localStream={localStream} />}
    </MainContainer>
  );
};

export default RoomButtons;
