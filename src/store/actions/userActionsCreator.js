//import { getUser } from "./userActions";
//import { getUserListings } from "./userActions";

export const getUserActionCreator = payload => {
  return {
    type: "GET_USER",
    payload
  };
};

export const getUserListingsCreator = payload => {
  return {
    type: "GET_USER_LISTINGS",
    payload
  };
};
export const getUserListingsPieDataCreator = payload => {
  return {
    type: "GET_USER_LISTINGS_PIE_DATA",
    payload
  };
};
export const deleteUserListingCreator = payload => {
  return {
    type: "DELETE_USER_LISTING",
    payload
  };
};

export const LogoutUserActionCreator = payload => {
  return {
    type: "LOG_OUT",
    payload
  };
};