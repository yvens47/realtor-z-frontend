const PersonReducer = (state = {}, actions) => {
  if (actions.type === "UPDATE_NAME") {
    return { name: actions.payload };
  }
  return { state };
};

export default PersonReducer;
