import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import sessionReducer from "../reducers/session";
import videoPlayerReducer from "../reducers/video";
import authReducer from "../reducers/authReducer";
import userDetailsReducer from "../reducers/userDetails";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      session: sessionReducer,
      videoPlayer: videoPlayerReducer,
      userAuth: authReducer,
      userDetails: userDetailsReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
