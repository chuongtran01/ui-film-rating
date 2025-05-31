import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { loginFormSchema } from "@/app/[locale]/schemas/login-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";
import { jwtDecode } from "jwt-decode";
import { IBaseUser } from "@/interfaces/base";
import { CustomJwtPayload } from "@/interfaces/auth";
import { UserRole } from "@/enums/UserRole";
import { setPrincipalAction } from "@/redux/features/principal/principalSlice";
import { useRouter } from "@/i18n/routing";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { UserGender } from "@/enums/UserGender";
type LoginFormProps = {
  onSubmit?: () => void;
  className?: string;
};

export type LoginFormValues = z.infer<typeof loginFormSchema>;

const defaultValues: Partial<LoginFormValues> = {
  email: "",
  password: "",
};

const LoginForm = ({ onSubmit, className, ...props }: LoginFormProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const decodedUser = jwtDecode(response.accessToken) as CustomJwtPayload;

      const loginUser: IBaseUser = {
        id: decodedUser.id,
        displayName: decodedUser.displayName,
        role: decodedUser.role as UserRole,
        email: decodedUser.sub || "",
        dob: decodedUser.dob || undefined,
        gender: decodedUser.gender as UserGender,
        avatarUrl: decodedUser.avatarUrl || "https://github.com/shadcn.png",
      };

      dispatch(setPrincipalAction(loginUser));
      onSubmit?.();
      form.reset();
    },
    onError: (e) => {
      toast({
        title: "Login failed",
        description: "Please try again",
      });
    },
  });

  const onFormSubmit = (values: LoginFormValues) => {
    mutation.mutate(values);
  };

  return (
    <Card className={cn("flex flex-col", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="loginForm" onSubmit={form.handleSubmit(onFormSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-2">
                <div className="flex items-center">
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-4">
        <Button form="loginForm" type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full bg-white text-black">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
