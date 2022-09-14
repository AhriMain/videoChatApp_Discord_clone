export const validateLoginForm = ({ mail, password }) => {
  return validatePassword(password) && validateMail(mail);
};

//form validators

const validatePassword = (password) => {
  return password.length > 6 && password.length < 12;
};

export const validateMail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateUsername = (username) =>
  username.length > 2 && username.length < 13;

export const validateRegisterForm = ({ mail, password, username }) => {
  return (
    validatePassword(password) &&
    validateMail(mail) &&
    validateUsername(username)
  );
};
