import React from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { closeAlertMessage } from "../../store/actions/alertActions";
import store from "../../store/store";
const AlertNotification = () => {
  const alertState = useSelector((state) => state.alert);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={alertState.showAlertMessage}
      onClose={() => closeAlertMessage(store.dispatch)}
      autoHideDuration={3000}
    >
      <Alert severity="error" variant="filled">
        {alertState.alertMessageContent}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotification;
