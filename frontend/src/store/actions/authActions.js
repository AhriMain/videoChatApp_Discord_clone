import * as api from "../../api";
import { openAlertMessage } from "./alertActions";
import store from "../store";
export const authAction = { SET_USER_DETAILS: "AUTH.SET_USER_DETAILS" };

// action generator
export const setUserDetails = (userDetails) => {
  return {
    type: authAction.SET_USER_DETAILS,
    userDetails,
  };
};

// login action
export const login = async (dispatch, userDetails, navigate) => {
  const response = await api.login(userDetails);
  console.log(response);
  if (response.error) {
    //   show error meessage in alert
    openAlertMessage(store.dispatch, response?.exception?.response?.data);
  } else {
    const { userDetails } = response?.data; //checks if response is undefined or not
    localStorage.setItem("user", JSON.stringify(userDetails));
    dispatch(setUserDetails(userDetails));
    navigate("/dashboard");
  }
};

// register action
export const register = async (dispatch, userDetails, navigate) => {
  const response = await api.register(userDetails);
  if (response.error) {
    //   show error meessage in alert
    dispatch(openAlertMessage(response?.exception?.response?.data));
  } else {
    const { userDetails } = response?.data; //checks if response is undefined or not
    localStorage.setItem("user", JSON.stringify(userDetails));
    dispatch(setUserDetails(userDetails));
    navigate("/dashboard");
  }
};
