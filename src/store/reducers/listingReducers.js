const listingReducer = (state = {}, actions) => {
  switch (actions.type) {
    case "GET_LISTINGS":
      return { data: actions.payload };

      break;

    default:
      return state;
      break;
  }
};

export default listingReducer;
