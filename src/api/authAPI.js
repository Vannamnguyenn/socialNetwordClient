import baseAPI from "./baseAPI";

const authAPI = {
  register(payload) {
    return baseAPI.post("/auth/register", payload);
  },
  login(payload) {
    return baseAPI.post("/auth/login", payload);
  },
  loginGoogle(payload) {
    return baseAPI.post("/auth/google-login", payload);
  },
  loginFacebook(payload) {
    return baseAPI.post("/auth/facebook-login", payload);
  },
  logout() {
    return baseAPI.post("/auth/logout");
  },
  getAccessToken(token) {
    return baseAPI.get("/auth/refresh_token", {
      headers: {
        Authorization: token,
      },
    });
  },
  forgotPassword(payload) {
    return baseAPI.post("/auth/forgot-password", payload);
  },
  resetPassword(payload) {
    return baseAPI.post("/auth/reset-password", payload);
  },
};

export default authAPI;
