const listingReducer = (state = {}, actions) => {
  switch (actions.type) {
    case "GET_LISTINGS":
      return {
        data: actions.payload
      };

    default:
      return state;

  }
};

export default listingReducer;