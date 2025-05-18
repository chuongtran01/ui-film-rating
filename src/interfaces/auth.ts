import { EnumRole } from "@/enums/EnumRole";
import { EnumGender } from "@/enums/EnumGender";
import { IBaseUser } from "@/interfaces/base";
import { JwtPayload } from "jwt-decode";

interface ILoginForm {
  username: string;
  password: string;
}

interface ILoginFormResponse {
  accessToken: string;
  refreshToken: string;

  user: IBaseUser;
}

interface ISignupFormResponse {
  id: string;
  displayName: string;
  email: string;
  role: EnumRole;
  gender: EnumGender;
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  displayName: string;
  role: EnumRole;
  gender: EnumGender;
  dob: string | undefined;
  avatarUrl: string;
}

export type { ILoginForm, ILoginFormResponse, ISignupFormResponse, CustomJwtPayload };
