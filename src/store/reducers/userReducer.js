const userReducer = (state = {}, actions) => {
  switch (actions.type) {
    case "GET_USER":
      return Object.assign({}, state, { account: actions.payload });
      break;
    case "GET_USER_LISTINGS":
      return Object.assign({}, state, { listings: actions.payload });
      break;
    case "DELETE_USER_LISTING":
      // clone the current state
      const cloneState = { ...state };
      // remove listing based on id received from payload
      const removeDeleteListing = cloneState.listings.filter(
        listing => listing._id !== actions.payload._id
      );
      // new state
      return Object.assign({}, state, { listings: removeDeleteListing });
      break;

    case "LOG_OUT":
      return Object.assign({}, actions.payload);
      break;

    default:
      return state;
      break;
  }
};
export default userReducer;
