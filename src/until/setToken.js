import baseAPI from "../api/baseAPI";

export const setTokenHeader = (token) => {
  baseAPI.defaults.headers.common["Authorization"] = token;
};
