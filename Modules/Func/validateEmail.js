const emailExistence = require("email-existence");

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};
const verifyEmail = (email) => {
  emailExistence.check(email, (error, response) => {
    if (response) {
      console.log(response);
      return true;
    } else {
      console.log(response);
      return false;
    }
  });
};
const isEmpty = (string) => {
  if (string && string.trim() !== "") return false;
  else return true;
};

const validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (!isEmail(data.email)) errors.email = "Must be a valid Email Id";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

const validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email) && !verifyEmail(data.email)) {
    errors.email = "Must be a valid Email Id";
  }
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (isEmpty(data.firstName)) errors.firstName = "Must not be empty";
  if (isEmpty(data.lastName)) errors.lastName = "Must not be empty";
  if (isEmpty(data.userHandle)) errors.userHandle = "Must not be empty";
  if (isEmpty(data.gender)) errors.gender = "Must not be empty";

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Password did not match";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

module.exports = { isEmail, isEmpty, validateLoginData, validateSignupData };
