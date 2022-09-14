import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Video from "./Video";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideosContainer = () => {
  const localStream = useSelector((state) => state.room?.localStream);

  const screenSharingStream = useSelector(
    (state) => state.room.screenSharingStream
  );
  const remoteStreams = useSelector((state) => state.room.remoteStream);
  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      {remoteStreams.map((stream) => (
        <Video stream={stream} key={stream.id} />
      ))}
    </MainContainer>
  );
};

export default VideosContainer;
