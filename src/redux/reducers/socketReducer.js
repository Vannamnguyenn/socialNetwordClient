import { GlobalTypes } from "../types/globalTypes";
const socketReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GlobalTypes.SOCKET:
      return payload;
    default:
      return state;
  }
};

export default socketReducer;
