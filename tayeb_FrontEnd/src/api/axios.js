import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Laravel API URL
  withCredentials: true, // Important for sending cookies with requests
});

// Add a request interceptor to attach the token to each request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
