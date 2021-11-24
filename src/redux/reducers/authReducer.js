import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  LOAD_USER,
  UPDATE_FOLLOW,
  UPDATE_PROFILE,
} from "../types/authType";

const initialState = {
  user: null,
  isAuthenticated: false,
  access_token: null,
  isLoading: true,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_LOGIN:
      return {
        ...state,
        user: payload.user,
        isAuthenticated: payload.isAuthenticated,
        access_token: payload.access_token,
        isLoading: false,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        access_token: null,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: payload.user,
      };
    case LOAD_USER:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_FOLLOW: {
      const check = state.user.following.includes(payload.id);

      let newFollowing;
      if (check) {
        newFollowing = state.user.following.filter((u) => u !== payload.id);
      } else {
        newFollowing = [...state.user.following, payload.id];
      }

      return {
        ...state,
        user: {
          ...state.user,
          following: newFollowing,
        },
      };
    }
    default:
      return state;
  }
};

export default authReducer;
