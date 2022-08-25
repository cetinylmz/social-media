module.exports.validateRegisterInput = ({ ...data }) => {
  const errors = {};
  if (data.fullName.trim() === "") {
    errors.fullName = "fullName must not be empty";
  }
  if (data.email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!data.email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (data.password === "") {
    errors.password = "Password must not empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};


module.exports.validateLoginInput = ({...data}) => {
  const errors = {};
  if (data.email.trim() === "") {
    errors.email = "email must not be empty";
  }
  if (data.password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
