"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signUpFormSchema } from "@/app/[locale]/schemas/signup";
import { Separator } from "@/components/ui/separator";
import { FacebookIcon } from "lucide-react";
import { Icons } from "@/components/ui/icons";

type SignupFormProps = {
  onSubmit: (values: { email: string; password: string }) => void;
};

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Enter your email below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-4 mb-4">
          <Button variant="outline" className="w-full">
            <FacebookIcon />
            Facebook
          </Button>
          <Button variant="outline" className="w-full">
            <Icons.google />
            Google
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Separator className="w-1/4" />
          <span className="text-xs uppercase text-muted-foreground">Or continue with</span>
          <Separator className="w-1/4" />
        </div>
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
      <CardFooter className="flex justify-between">
        <Button form="signupForm" type="submit" className="w-full">
          Create account
        </Button>
      </CardFooter>
    </Card>
  );
}
