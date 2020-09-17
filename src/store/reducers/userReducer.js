const userReducer = (state = {}, actions) => {
  switch (actions.type) {
    case "GET_USER":
      return Object.assign({}, state, {
        account: actions.payload
      });
      break;
    case "GET_USER_LISTINGS":
      return Object.assign({}, state, {
        listings: actions.payload
      });
      break;
    case "GET_USER_LISTINGS_PIE_DATA":
      const statuses = getUserListingStatus(state);
      return Object.assign({}, state, {
        pieData: statuses,
        pieDataTitle: Object.keys(statuses)
      });
      break;
    case "DELETE_USER_LISTING":
      // clone the current state
      const cloneState = {
        ...state
      };
      // remove listing based on id received from payload
      const removeDeleteListing = cloneState.listings.filter(
        listing => listing._id !== actions.payload._id
      );
      // new state
      return Object.assign({}, state, {
        listings: removeDeleteListing
      });
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


// helper functions --- move to a new file later
function status(status, object) {
  return status === object.status;

}

function getUserListingStatus(state) {
  const statuses = {};
  var accumulatorPublished = 0;
  var accumulatorUnpublished = 0;
  var accumulatorDraft = 0;
  state.listings.forEach((listing) => {
    if (status('Published', listing)) {
      accumulatorPublished += 1;
      statuses.Published = accumulatorPublished;
    }
    if (status('Unpublished', listing)) {
      accumulatorUnpublished += 1;
      statuses.Unpublished = accumulatorUnpublished;
    }
    if (status('Draft', listing)) {
      accumulatorDraft += 1;
      statuses.Draft = accumulatorDraft;
    }
  });
  return statuses;
}