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

interface CustomJwtPayload extends JwtPayload {
  id: string;
  firstName: string;
  lastName: string;
  roles: string[];
  active: boolean;
  avatarUrl: string;
}

export type { ILoginForm, ILoginFormResponse, CustomJwtPayload };
