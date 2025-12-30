import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  getAccessToken,
  refreshAccessToken,
  setAccessToken,
  clearAccessToken,
  isTokenExpired,
} from "../lib/tokenManager";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // your API base
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // needed for HttpOnly refresh token
});

// ========================
// REQUEST INTERCEPTOR
// ========================
api.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ========================
// RESPONSE INTERCEPTOR
// ========================
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // If not 401 → just reject
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Prevent infinite retry loop
    if (originalRequest._retry) {
      clearAccessToken();
      return Promise.reject(error);
    }

    // Only refresh if token is actually expired
    const token = getAccessToken();
    const tokenExpired = isTokenExpired(token || undefined);

    if (!tokenExpired) {
      // Token exists but still rejected → invalid permissions, logout
      clearAccessToken();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newToken = await refreshAccessToken();
      setAccessToken(newToken);

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      clearAccessToken();
      return Promise.reject(refreshError);
    }
  }
);

export default api;
