import { GlobalTypes } from "../types/globalTypes";

const initialState = {
  theme: "light",
};

const globalReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GlobalTypes.CHANGE_THEME:
      return payload;
    default:
      return state;
  }
};

export default globalReducer;
