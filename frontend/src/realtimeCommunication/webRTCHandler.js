import store from "../store/store";
import { setLocalStream, setRemoteStreams } from "../store/actions/roomActions";
import Peer from "simple-peer";
import * as socketConnection from "./socketConnection";
import { openAlertMessage } from "../store/actions/alertActions";
const onlyAudioConstraints = {
  audio: true,
  video: false,
};
const defaultConstraints = {
  video: true,
  audio: true,
};

const getConfiguration = () => {
  const turnIceServers = null; //if direct connection b/w peers is not possible traffic
  // will go through turn servers
  if (turnIceServers) {
    // TODO use TURN server credentials
  } else {
    console.warn("using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.1.google.com:19302", //we will get our internet connection details
        },
      ],
    };
  }
};

export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      console.log(stream);
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((err) => {
      err.msg = "cannot access localstream";
      openAlertMessage(store.dispatch, err.msg);
      console.error("cannot access localstream");
    });
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStream;
  if (isInitiator) {
    console.log("preparing new peer connection as initiator");
  } else {
    console.log("not initiator");
  }
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator, //if this field has value true then it
    //will automaticaaly connect to other users or peers
    config: getConfiguration(), //here we will get our ice candidates that include our
    // internet details
    stream: localStream,
  }); //this is an object

  peers[connUserSocketId].on("error", (err) => console.log("error", err));
  // here we listen to data which we wuld like to share with other users
  // here we will get our sdp data and ice candidates
  // this listener will run when we get this peers sdp and ice
  peers[connUserSocketId].on("signal", (data) => {
    console.log(data);
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    socketConnection.signalPeerData(signalData);
    // TODO
    // socketConnection.signalePeerData(signalData)
  });
  console.log(peers);

  peers[connUserSocketId].on("stream", (remoteStream) => {
    // TODO
    // add new remoteStream to reduxStore
    console.log("data coming stream remote enabled");
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
};

export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

const addNewRemoteStream = (remoteStream) => {
  const remoteStreams = store.getState().room.remoteStream;
  const newRemoteStreams = [...remoteStreams, remoteStream];
  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const closeAllCOnnections = () => {
  // converting object to array
  console.log(Object.entries(peers));
  Object.entries(peers).forEach((mappedObject) => {
    console.log("mapped", mappedObject);
    const connUserSocketId = mappedObject[0];
    if (peers[connUserSocketId]) {
      // below function is provided by simple peer
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  });
};

export const handleParticipantLeftRoom = (data) => {
  const { connUserSocketId } = data;
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }
  const remmoteStreams = store.getState().room.remoteStream;
  const newRemoteStreams = remmoteStreams.filter((remoteStream) => {
    return remoteStream.connUserSocketId !== connUserSocketId;
  });
  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const switchOutgoingTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};
