import { SET_STATE_UPDATE_POST } from "../types/stateUpdatePostTypes";

const initialState = {
  show: false,
  post: null,
};

const stateUpdatePostReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case SET_STATE_UPDATE_POST:
      return payload;
    default:
      return state;
  }
};

export default stateUpdatePostReducer;
