import { combineReducers } from "redux";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
import toastReducer from "./toastReducer";
import globalReducer from "./globalReducer";
import postsReducer from "./postReducer";
import postDetailReducer from "./postDetails";
import stateUpdatePostReducer from "./stateUpdatePostReducer";

export default combineReducers({
  auth: authReducer,
  toast: toastReducer,
  loading: loadingReducer,
  global: globalReducer,
  posts: postsReducer,
  postDetails: postDetailReducer,
  stateUpdatePost: stateUpdatePostReducer,
});
