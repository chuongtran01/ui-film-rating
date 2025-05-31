import { UserRole } from "@/enums/UserRole";
import { UserGender } from "@/enums/UserGender";

interface IBaseUser {
  id: string | undefined;
  email: string | undefined;
  displayName: string | undefined;
  role: UserRole | undefined;
  dob: Date;
  gender: UserGender | undefined;
  avatarUrl: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export type { IBaseUser };
