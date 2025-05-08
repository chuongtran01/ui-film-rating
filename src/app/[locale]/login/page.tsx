"use client";

import { z } from "zod";
import LoginForm from "@/components/authentication/LoginForm";
import { loginFormSchema } from "../schemas/login";
import authService from "@/services/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPrincipalAction } from "@/redux/features/principal/principalSlice";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { IBaseUser } from "@/interfaces/base";
import { CustomJwtPayload } from "@/interfaces/auth";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const decodedUser = jwtDecode(response.accessToken) as CustomJwtPayload;

      const loginUser: IBaseUser = {
        firstName: decodedUser.firstName,
        lastName: decodedUser.lastName,
        roles: decodedUser.roles,
        active: decodedUser.active,
        username: decodedUser.sub || "",
        avatarUrl: "https://github.com/shadcn.png",
      };

      dispatch(setPrincipalAction(loginUser));
      router.push("/");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
