import { ProfileAccountFormValues } from "@/components/profile/ProfileAccountForm";
import { IBaseUser } from "@/interfaces/base";
import { apiService } from "@/services/api";

const API_PREFIX = "user";

const userService = {
  updateMyAccountInformation: async (data: ProfileAccountFormValues): Promise<IBaseUser> => {
    const response = await apiService.put(`${API_PREFIX}/my-account`, data);
    return response.data;
  },
};

export default userService;
