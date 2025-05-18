import { EnumRole } from "@/enums/EnumRole";
import { EnumGender } from "@/enums/EnumGender";

interface IBaseUser {
  id: string;
  email: string;
  displayName: string;
  role: EnumRole;
  dob: string | undefined;
  gender: EnumGender | undefined;
  avatarUrl: string;
}

export type { IBaseUser };
