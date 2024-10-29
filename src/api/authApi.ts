import axios from "axios";

const authApi = axios.create({
  baseURL: "https://back-end-frpa.onrender.com/api/v1",
  withCredentials: true,
});

// Interceptor to attach access token for authenticated requests
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authApi;
