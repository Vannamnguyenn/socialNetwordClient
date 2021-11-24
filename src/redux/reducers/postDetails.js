import { GlobalTypes } from "../types/globalTypes";
import { UPDATE_POST } from "../types/postTypes";

const initialState = null;

const postDetailReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case GlobalTypes.GET_POST_DETAILS:
      return payload.post;
    case UPDATE_POST:
      if (state && state._id === payload.post._id) {
        return payload.post;
      }
      return state;
    default:
      return state;
  }
};

export default postDetailReducer;
