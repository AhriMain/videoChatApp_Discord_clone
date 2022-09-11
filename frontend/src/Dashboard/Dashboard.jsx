import React, { useEffect } from "react";
import { styled } from "@mui/material";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import SideBar from "./SideBar/SideBar";
import { logout } from "../shared/utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/actions/authActions";
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection";
import Room from "./Room/Room";


const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const isUserInRoom = useSelector(state=>state.room?.isUserInRoom)
  // check if jwt token is in localStorage.if not found logout and redirect
  // to login page
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      logout();
    } else {
      dispatch(setUserDetails(JSON.parse(userDetails)));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);

  
  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
      {isUserInRoom && <Room/>}
    </Wrapper>
  );
};

export default Dashboard;
