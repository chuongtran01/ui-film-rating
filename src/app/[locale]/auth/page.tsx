"use client";

import { z } from "zod";
import LoginForm from "@/components/authentication/LoginForm";
import { loginFormSchema } from "../schemas/login-form";
import authService from "@/services/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPrincipalAction } from "@/redux/features/principal/principalSlice";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { IBaseUser } from "@/interfaces/base";
import { CustomJwtPayload } from "@/interfaces/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupForm from "@/components/authentication/SignupForm";
import { signUpFormSchema } from "../schemas/signup-form";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const decodedUser = jwtDecode(response.accessToken) as CustomJwtPayload;

      const loginUser: IBaseUser = {
        id: decodedUser.id,
        firstName: decodedUser.firstName,
        lastName: decodedUser.lastName,
        roles: decodedUser.roles,
        active: decodedUser.active,
        email: decodedUser.sub || "",
        avatarUrl: "https://github.com/shadcn.png",
      };

      dispatch(setPrincipalAction(loginUser));
      router.push("/");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onSignInSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    mutation.mutate(values);
  };

  const onSignUpSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Tabs defaultValue="signin" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Sign in
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Sign up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <LoginForm onSubmit={onSignInSubmit} className="border-none" />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm onSubmit={onSignUpSubmit} className="border-none" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img src="/placeholder.svg" alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
};

export default Login;
