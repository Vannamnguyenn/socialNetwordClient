import { GlobalTypes } from "../types/globalTypes";

const initialState = {
  showToast: false,
  message: null,
  type: null,
};

const toastReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GlobalTypes.SET_TOAST:
      return payload;
    default:
      return state;
  }
};

export default toastReducer;
