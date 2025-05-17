"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { profilePasswordFormSchema } from "@/app/[locale]/schemas/profile-password-form";

type ProfilePasswordFormValues = z.infer<typeof profilePasswordFormSchema>;

const defaultValues: Partial<ProfilePasswordFormValues> = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ProfilePasswordForm = () => {
  const form = useForm<ProfilePasswordFormValues>({
    resolver: zodResolver(profilePasswordFormSchema),
    defaultValues,
  });

  function onSubmit(data: ProfilePasswordFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" className="w-72" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" className="w-72" />
              </FormControl>
              <FormDescription>Must be at least 6 characters with 1 number and special character.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" className="w-72" />
              </FormControl>
              <FormDescription>Must be at least 6 characters with 1 number and special character.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update password</Button>
      </form>
    </Form>
  );
};

export default ProfilePasswordForm;
