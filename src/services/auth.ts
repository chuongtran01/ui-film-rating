import { ILoginForm, ILoginFormResponse } from "@/interfaces/auth";
import { IBaseUser } from "@/interfaces/base";
import { apiService, refreshApiService } from "@/services/api";
import { configService } from "@/services/config";

const authService = {
  login: async (data: ILoginForm): Promise<ILoginFormResponse> => {
    const response = await apiService.post<ILoginFormResponse>("/auth/login", data);

    const { accessToken, refreshToken } = response.data;

    // Store tokens using configService
    configService.setAccessToken(accessToken);
    configService.setRefreshToken(refreshToken);

    return response.data;
  },

  refreshAccessToken: async () => {
    const refreshToken = configService.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const refreshTokenDto = {
      refreshToken: refreshToken,
    };

    const response = await refreshApiService.post("/auth/refresh-token", refreshTokenDto);

    if (response.data) {
      configService.setAccessToken(response.data.accessToken);
      return response.data.refreshToken;
    }
  },

  logout: async (): Promise<void> => {
    return await apiService.post("/auth/logout");
  },

  getUser: async (): Promise<IBaseUser> => {
    const accessToken = configService.getAccessToken();

    if (!accessToken) {
      throw new Error("No access token available");
    }

    return await apiService.get("/auth/user");
  },
};

export default authService;
