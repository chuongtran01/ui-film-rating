import { LoginFormValues } from "@/components/authentication/LoginForm";
import { SignupFormValues } from "@/components/authentication/SignupForm";
import { ProfilePasswordFormValues } from "@/components/profile/ProfilePasswordForm";
import { ILoginForm, ILoginFormResponse, ISignupFormResponse } from "@/interfaces/auth";
import { IBaseUser } from "@/interfaces/base";
import { apiService, refreshApiService } from "@/services/api";
import { configService } from "@/services/config";

const API_PREFIX = "auth";

const authService = {
  login: async (data: LoginFormValues): Promise<ILoginFormResponse> => {
    const response = await apiService.post<ILoginFormResponse>(`${API_PREFIX}/login`, data);

    const { accessToken, refreshToken } = response.data;

    // Store tokens using configService
    configService.setAccessToken(accessToken);
    configService.setRefreshToken(refreshToken);

    return response.data;
  },

  register: async (data: SignupFormValues): Promise<ISignupFormResponse> => {
    const response = await apiService.post<ISignupFormResponse>(`${API_PREFIX}/register`, data);

    return response.data;
  },

  changePassword: async (data: ProfilePasswordFormValues): Promise<void> => {
    await apiService.post<void>(`${API_PREFIX}/change-password`, data);
  },

  refreshAccessToken: async () => {
    const refreshToken = configService.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const refreshTokenDto = {
      refreshToken: refreshToken,
    };

    const response = await refreshApiService.post(`${API_PREFIX}/refresh-token`, refreshTokenDto);

    if (response.data) {
      configService.setAccessToken(response.data.accessToken);
      return response.data.refreshToken;
    }
  },

  logout: async (): Promise<void> => {
    await apiService.post(`${API_PREFIX}/logout`);
    configService.clearAccessTokenAndRefreshToken();
  },

  getUser: async (): Promise<IBaseUser> => {
    const accessToken = configService.getAccessToken();

    if (!accessToken) {
      throw new Error("No access token available");
    }

    return await apiService.get(`${API_PREFIX}/user`);
  },
};

export default authService;
