const alertActions = {
  OPEN_ALERT_MESSAGE: "ALERT.OPEN_ALERT_MESSAGE",
  CLOSE_ALERT_MESSAGE: "ALERT.CLOSE_ALERT_MESSAGE",
};

// for Alert message open
export const openAlertMessage = (dispatch, content) => {
  dispatch({ type: alertActions.OPEN_ALERT_MESSAGE, content });
};

// for alert message close
export const closeAlertMessage = (dispatch) => {
  dispatch({ type: alertActions.CLOSE_ALERT_MESSAGE });
};

export default alertActions;
