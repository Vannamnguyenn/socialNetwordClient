import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor
axiosConfig.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    throw error.response.data;
  }
);

export default axiosConfig;
