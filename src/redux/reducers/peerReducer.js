import { GlobalTypes } from "../types/globalTypes";

const peerReducer = (state = null, action) => {
  switch (action.type) {
    case GlobalTypes.PEER:
      return action.payload;
    default:
      return state;
  }
};

export default peerReducer;
