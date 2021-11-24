import { GlobalTypes } from "../types/globalTypes";

const initialState = {
  isLoading: false,
};

const loadingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GlobalTypes.LOADING:
      return payload;
    default:
      return state;
  }
};

export default loadingReducer;
