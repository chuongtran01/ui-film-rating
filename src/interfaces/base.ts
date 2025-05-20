import { EnumRole } from "@/enums/EnumRole";
import { EnumGender } from "@/enums/EnumGender";

interface IBaseUser {
  id: string | undefined;
  email: string | undefined;
  displayName: string | undefined;
  role: EnumRole | undefined;
  dob: string | undefined;
  gender: EnumGender | undefined;
  avatarUrl: string | undefined;
}

export type { IBaseUser };
