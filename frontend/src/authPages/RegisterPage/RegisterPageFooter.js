import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Enter correct e-mail address and password should contain between 6 and 12 characters";
};

const getFormValidMessage = () => "Press to Register!";

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const navigate = useNavigate();

  const handlePushToRegisterPage = () => {
    navigate("/login");
  };

  return (
    <>
      {/* mui tooltip will only wrap around html components and not on components */}
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
        arrow
      >
        <div>
          <CustomPrimaryButton
            disabled={!isFormValid}
            label="Register"
            additionalStyles={{ marginTop: "30px" }}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Already have an account?"
        redirectText="Login"
        additionalStyle={{ marginTop: "5px" }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

export default RegisterPageFooter;
