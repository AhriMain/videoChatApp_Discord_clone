const alertActions = {
  OPEN_ALERT_MESSAGE: "ALERT.OPEN_ALERT_MESSAGE",
  CLOSE_ALERT_MESSAGE: "ALERT.CLOSE_ALERT_MESSAGE",
};

export const openAlertMessage = (dispatch, content) => {
  dispatch({ type: alertActions.OPEN_ALERT_MESSAGE, content });
};
export const closeAlertMessage = (dispatch) => {
  dispatch({ type: alertActions.CLOSE_ALERT_MESSAGE });
};

export default alertActions;
