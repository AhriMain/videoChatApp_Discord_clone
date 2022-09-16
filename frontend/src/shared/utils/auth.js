import { openAlertMessage } from "../../store/actions/alertActions";
import store from "../../store/store";

export const logout = () => {
  localStorage.clear();
  openAlertMessage(store.dispatch, "Have a Nice Day");
  window.location.pathname = "/login";
};
