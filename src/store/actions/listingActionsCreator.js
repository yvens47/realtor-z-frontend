const getListingsActionCreator = payload => {
  return {
    type: "GET_LISTINGS",
    payload
  };
};

export default getListingsActionCreator;
