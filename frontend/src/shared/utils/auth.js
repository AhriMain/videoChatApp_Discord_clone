import { openAlertMessage } from "../../store/actions/alertActions";
import store from "../../store/store";

export const logout = () => {
  localStorage.clear();
  openAlertMessage(store.dispatch, "login again");
  window.location.pathname = "/login";
};
