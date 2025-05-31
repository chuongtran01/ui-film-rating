import { UserRole } from "@/enums/UserRole";
import { UserGender } from "@/enums/UserGender";
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
  role: UserRole;
  gender: UserGender;
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  gender: UserGender;
  dob: Date | undefined;
  avatarUrl: string;
}

export type { ILoginForm, ILoginFormResponse, ISignupFormResponse, CustomJwtPayload };
