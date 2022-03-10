import { GlobalTypes } from "../types/globalTypes";

const callReducer = (state = null, action) => {
  switch (action.type) {
    case GlobalTypes.CALL:
      return action.payload;
    default:
      return state;
  }
};

export default callReducer;
