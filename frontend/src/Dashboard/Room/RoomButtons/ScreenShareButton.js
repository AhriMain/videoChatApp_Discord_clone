import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { setScreenSharingStream } from "../../../store/actions/roomActions";
import { useSelector } from "react-redux";
import * as webRTCHandler from "../../../realtimeCommunication/webRTCHandler";
import store from "../../../store/store";

const ScreenShareButton = ({ dispatch, localStream }) => {
  const room = useSelector((state) => state.room);
  console.log(room);
  const { isScreenSharingActive, screenSharingStream } = room;
  const constraints = { audio: false, video: true };
  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (error) {
        console.log("error");
      }
      if (stream) {
        console.log("stream",stream.getTracks());
        dispatch(setScreenSharingStream(stream));
        console.log(store.getState().room.screenSharingStream.getTracks());
        webRTCHandler.switchOutgoingTracks(stream);
      }
    } else {
      webRTCHandler.switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((t) => t.stop());
      dispatch(setScreenSharingStream(null));
    }
  };
  return (
    <IconButton onClick={handleScreenShareToggle} style={{ color: "white" }}>
      {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
    </IconButton>
  );
};

export default ScreenShareButton;
