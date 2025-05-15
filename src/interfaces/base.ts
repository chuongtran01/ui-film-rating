interface IBaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  roles: string[];
  avatarUrl: string;
}

export type { IBaseUser };
