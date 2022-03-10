import {
  CHANGE_IS_READ,
  CHANGE_NOTIFY_ON,
  DELETE_ALL_NOTIFICATIONS,
  GET_NOTIFICATION,
  UPDATE_NOTIFY,
} from "../types/notifyTypes";

const initialState = {
  notifies: [],
  loading: false,
  isNotifyOn: false,
};

const notifyReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case GET_NOTIFICATION:
      return {
        ...state,
        notifies: payload,
      };
    case UPDATE_NOTIFY:
      return {
        ...state,
        notifies: [...state.notifies, payload],
      };
    case DELETE_ALL_NOTIFICATIONS:
      return initialState;
    case CHANGE_NOTIFY_ON:
      return {
        ...state,
        isNotifyOn: payload,
      };
    case CHANGE_IS_READ:
      let newState = [...state.notifies];
      newState = newState.map((notify) => {
        if (notify._id === payload._id) {
          notify = payload;
        }
        return notify;
      });
      return {
        ...state,
        notifies: newState,
      };
    default:
      return state;
  }
};

export default notifyReducer;
