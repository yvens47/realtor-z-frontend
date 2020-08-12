import { createStore, combineReducers } from "redux";

import userReducer from "./reducers/userReducer";
import listingReducer from "./reducers/listingReducers";

const initialStates = {
  listing: { data: ["hello world"] }
};

const store = createStore(
  combineReducers({
    listing: listingReducer,
    user: userReducer
  }),
  initialStates,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
