import authAPI from "../../api/authAPI";
import { setTokenHeader } from "../../until/setToken";
import { AUTH_LOGIN, AUTH_LOGOUT, LOAD_USER } from "../types/authType";
import { LoadingAction } from "./loadingAction";

const payloadSuccessAuth = (user, access_token) => ({
  type: AUTH_LOGIN,
  payload: {
    user,
    isAuthenticated: true,
    access_token,
  },
});

const setFirtstLogin = () => {
  localStorage.setItem("firstLogin", true);
};

const setRefreshTokenStorage = (token) => {
  localStorage.setItem("refresh_token", token);
};

export const registerAction = (payload) => async (dispatch) => {
  dispatch(LoadingAction(true));
  try {
    const response = await authAPI.register(payload);
    await setTokenHeader(response.data?.access_token);
    dispatch(
      payloadSuccessAuth(response.data?.user, response.data?.access_token)
    );
    setFirtstLogin();
    setRefreshTokenStorage(response.data?.refresh_token);
    dispatch(LoadingAction(false));
    return response.data;
  } catch (error) {
    dispatch(LoadingAction(false));
    return error;
  }
};

export const login = (payload) => async (dispatch) => {
  dispatch(LoadingAction(true));
  try {
    const response = await authAPI.login(payload);
    await setTokenHeader(response.data?.access_token);
    dispatch(
      payloadSuccessAuth(response.data?.user, response.data?.access_token)
    );
    setFirtstLogin();
    setRefreshTokenStorage(response.data?.refresh_token);
    dispatch(LoadingAction(false));
    return response.data;
  } catch (error) {
    dispatch(LoadingAction(false));
    return error;
  }
};

export const loginGoogleAction = (payload) => async (dispatch) => {
  dispatch(LoadingAction(true));
  try {
    const response = await authAPI.loginGoogle(payload);
    await setTokenHeader(response.data?.access_token);
    dispatch(
      payloadSuccessAuth(response.data?.user, response.data?.access_token)
    );
    setRefreshTokenStorage(response.data?.refresh_token);
    setFirtstLogin();

    dispatch(LoadingAction(false));

    return response.data;
  } catch (error) {
    dispatch(LoadingAction(false));
    return error;
  }
};
export const loginFacebookAction = (payload) => async (dispatch) => {
  dispatch(LoadingAction(true));
  try {
    const response = await authAPI.loginFacebook(payload);
    await setTokenHeader(response.data?.access_token);
    dispatch(
      payloadSuccessAuth(response.data?.user, response.data?.access_token)
    );
    setFirtstLogin();
    setRefreshTokenStorage(response.data?.refresh_token);
    dispatch(LoadingAction(false));
    return response.data;
  } catch (error) {
    dispatch(LoadingAction(false));
    return error;
  }
};

export const forgotPassword = (payload) => async (dispatch) => {
  try {
    dispatch(LoadingAction(true));
    const response = await authAPI.forgotPassword(payload);
    dispatch(LoadingAction(false));
    return response.data;
  } catch (error) {
    dispatch(LoadingAction(false));
    return error;
  }
};

export const resetPassword = (payload) => async (dispatch) => {
  try {
    dispatch(LoadingAction(true));
    const response = await authAPI.resetPassword(payload);
    dispatch(LoadingAction(false));
    return response.data;
  } catch (error) {
    dispatch(LoadingAction(false));
    return error;
  }
};

export const loadingUser = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (!firstLogin)
    return dispatch({
      type: LOAD_USER,
      payload: null,
    });
  try {
    const response = await authAPI.getAccessToken(
      localStorage.getItem("refresh_token")
    );
    await setTokenHeader(response.data?.access_token);
    dispatch(
      payloadSuccessAuth(response.data?.user, response.data?.access_token)
    );

    setFirtstLogin();
  } catch (error) {
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("refresh_token");
    setTokenHeader(null);
    return dispatch({
      type: LOAD_USER,
      payload: null,
    });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    const response = await authAPI.logout();
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("refresh_token");
    setTokenHeader(null);
    dispatch({
      type: AUTH_LOGOUT,
      payload: null,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
