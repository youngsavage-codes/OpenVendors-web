import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "../config/axios-config";

export interface DecodedToken {
  sub?: string;
  email?: string;
  role?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

const ACCESS_TOKEN_KEY = "access_token";

/* =======================
   ACCESS TOKEN HANDLING
======================= */

export const getAccessToken = (): string | null => {
  return Cookies.get(ACCESS_TOKEN_KEY) || null;
};

export const setAccessToken = (token: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: 1 / 24, // 1 hour
  });
};

export const clearAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
};

/* =======================
   TOKEN UTILITIES
======================= */

export const decodeToken = (token: string) => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token?: string): boolean => {
  const t = token || getAccessToken();
  if (!t) return true;

  const decoded = decodeToken(t);
  if (!decoded?.exp) return true;

  return Date.now() >= decoded.exp * 1000;
};

/* =======================
   REFRESH TOKEN HANDLING
   (HTTP-ONLY COOKIE)
======================= */

export const refreshAccessToken = async () => {
  const res = await api.post("/auth/refresh"); // refresh token comes from HttpOnly cookie
  const token = res.data.accessToken;

  setAccessToken(token);
  return token;
};
