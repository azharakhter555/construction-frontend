import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

export const apiClient = axios.create({
  baseURL: process.env["NEXT_PUBLIC_API_URL"] || "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

// Request interceptor – attach token if available
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional response interceptor for 401 handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
    }
    return Promise.reject(error);
  }
);
