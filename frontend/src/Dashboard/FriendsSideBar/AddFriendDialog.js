import React, { useEffect, useState } from "react";
import { validateMail } from "../../shared/utils/validators";
import { Dialog, DialogTitle, Typography } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import InputWithLabel from "../../shared/components/InputWithLabel";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import { sendFriendInvitation } from "../../store/actions/friendsActions";
import { useDispatch } from "react-redux";

const AddFriendDialog = ({ isDialogOpen, closeDialogHandler }) => {
  const dispatch = useDispatch();
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSendInvitation = () => {
    sendFriendInvitation(
      dispatch,
      { targetMailAddress: mail },
      closeDialogHandler
    );
    setMail("");
  };

  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail("");
  };
  useEffect(() => {
    setIsFormValid(validateMail(mail));
  }, [mail, setIsFormValid]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography component={"span"}>Invite a Friend</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component={"span"}>Enter email-address</Typography>
          </DialogContentText>
          <InputWithLabel
            label="Mail mate"
            type="value"
            value={mail}
            setValue={setMail}
            placeholder="Enter mail address"
          />
        </DialogContent>
        <DialogActions>
          <CustomPrimaryButton
            onClick={handleSendInvitation}
            disabled={!isFormValid}
            label="Send"
            additionalStyles={{
              marginLeft: "15px",
              marginRight: "15px",
              marginBottom: "10px",
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddFriendDialog;
