import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:3000/api/v1",
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
