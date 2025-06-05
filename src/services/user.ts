import { ProfileAccountFormValues } from "@/components/profile/ProfileAccountForm";
import { IBaseUser } from "@/interfaces/base";
import { UserRole } from "@/enums/UserRole";
import { apiService } from "@/services/api";
import { PaginationResponse } from "@/interfaces/pagination";
import { User } from "@/types/user";
import { GetUsersSchema, UpdateUserSchema } from "@/components/admin/users/table/validations";

const API_PREFIX = "users";

const userService = {
  updateMyAccountInformation: async (data: ProfileAccountFormValues): Promise<IBaseUser> => {
    const response = await apiService.put(`${API_PREFIX}/my-account`, data);
    return response.data;
  },

  getUsers: async (search: Partial<GetUsersSchema>): Promise<PaginationResponse<User>> => {
    const response = await apiService.get(`${API_PREFIX}`, {
      params: {
        ...search,
      },
    });
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiService.delete(`${API_PREFIX}/${id}`);
  },

  updateUser: async (id: string, data: UpdateUserSchema): Promise<User> => {
    const response = await apiService.put(`${API_PREFIX}/${id}`, data);
    return response.data;
  },
};

export default userService;
