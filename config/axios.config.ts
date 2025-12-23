/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import TokenService from "@/services/token.service";
import { post } from "@/lib/http";

// ========================
// Axios Instance
// ========================
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true, // ✅ important if backend uses cookies
});

// ========================
// Token Refresh Queue
// ========================
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// ========================
// Request Interceptor
// ========================
api.interceptors.request.use(
  (config) => {
    // Add Access Token (if NOT httpOnly)
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["X-App-Platform"] = "web";
    return config;
  },
  (error) => Promise.reject(error)
);

// ========================
// Response Interceptor — Token Refresh
// ========================
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Handle 401 (expired access token)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const accessToken = TokenService.getAccessToken();
        const isTokenExpired = TokenService.isTokenExpired(accessToken!)

        if(accessToken && isTokenExpired) {
          
           const refreshToken = TokenService.getRefreshToken()
        // Backend refreshes cookie / token
          const res = await post('/auth/refresh', {
            refreshToken
          });

          const newAccessToken = TokenService.setAccessToken('');
          TokenService.setRefreshToken('');

          api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken!);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        processQueue(err, null);
        TokenService.clearTokens();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
