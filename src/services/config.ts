import { JwtPayload, jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY: string = "access-token";
const REFRESH_TOKEN_KEY: string = "refresh-token";

export const configService = {
  /**
   * Access token handler
   */
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setAccessToken(token: string): void {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  clearAccessToken(): void {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  isTokenExpired(token: string | null): boolean {
    if (!token) {
      return true;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      // Check if the `exp` field exists
      if (!decoded.exp) {
        return true; // If there's no expiration, consider it expired
      }

      // Compare the expiration time with the current time
      // const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      // return decoded.exp <= currentTime;

      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return true; // If decoding fails, treat the token as expired
    }
  },

  /**
   * Refresh token handler
   */

  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string): void {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  clearRefreshToken(): void {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  clearAccessTokenAndRefreshToken(): void {
    this.clearAccessToken();
    this.clearRefreshToken();
  },
};
