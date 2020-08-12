export const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(error => {
    if (error.length > 0) {
      valid = false;
    }
  });
  return valid;
};
