/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";// ✅ Make sure this is installed: npm install jwt-decode

const ACCESS_TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export interface DecodedToken {
  sub?: string;       // user id
  email?: string;
  role?: string;
  exp?: number;       // expiration timestamp (seconds)
  iat?: number;       // issued at timestamp
  [key: string]: any; // any extra payload fields
}

const TokenService = {
  /** Get access token */
  getAccessToken(): string | null {
    return Cookies.get(ACCESS_TOKEN_KEY) || null;
  },

  /** Get refresh token */
  getRefreshToken(): string | null {
    return Cookies.get(REFRESH_TOKEN_KEY) || null;
  },

  /** Set access token only */
  setAccessToken(token: string): void {
    Cookies.set(ACCESS_TOKEN_KEY, token, {
      expires: 7, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  /** Set refresh token only */
  setRefreshToken(token: string): void {
    Cookies.set(REFRESH_TOKEN_KEY, token, {
      expires: 30, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  },

  /** Set both tokens */
  setTokens(accessToken: string, refreshToken?: string): void {
    this.setAccessToken(accessToken);
    if (refreshToken) this.setRefreshToken(refreshToken);
  },

  /** Remove both tokens */
  clearTokens(): void {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },

  /** Decode JWT token safely */
  decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (err) {
      console.error("Failed to decode token", err);
      return null;
    }
  },

  /** Decode stored access token */
  getDecodedAccessToken(): DecodedToken | null {
    const token = this.getAccessToken();
    if (!token) return null;
    return this.decodeToken(token);
  },

  /** Check if a token is expired */
  isTokenExpired(token?: string): boolean {
    const t = token || this.getAccessToken();
    if (!t) return true;
    const decoded = this.decodeToken(t);
    if (!decoded?.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  },

  /** Get specific claim from token */
  getTokenClaim<T = any>(claim: string, token?: string): T | null {
    const t = token || this.getAccessToken();
    if (!t) return null;
    const decoded = this.decodeToken(t);
    if (!decoded) return null;
    return decoded[claim] ?? null;
  },
};

export default TokenService;
