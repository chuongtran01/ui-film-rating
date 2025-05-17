"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signUpFormSchema } from "@/app/[locale]/schemas/signup-form";
import { cn } from "@/lib/utils";

type SignupFormProps = {
  onSubmit: (values: SignupFormValues) => void;
  className?: string;
};

type SignupFormValues = z.infer<typeof signUpFormSchema>;

const defaultValues: Partial<SignupFormValues> = {
  email: "",
  password: "",
};

const SignupForm = ({ onSubmit, className, ...props }: SignupFormProps) => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues,
  });

  return (
    <Card className={cn("flex flex-col", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Create account</CardTitle>
        <CardDescription>Enter your email below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form id="signupForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-4">
        <Button form="signupForm" type="submit" className="w-full">
          Create account
        </Button>
        <Button variant="outline" className="w-full bg-white text-black">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
