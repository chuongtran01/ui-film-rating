"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profilePasswordFormSchema } from "@/app/[locale]/schemas/profile-password-form";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";
import toastService from "@/services/toast";
import { useTranslations } from "next-intl";

export type ProfilePasswordFormValues = z.infer<typeof profilePasswordFormSchema>;

const defaultValues: Partial<ProfilePasswordFormValues> = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ProfilePasswordForm = () => {
  const t = useTranslations();

  const form = useForm<ProfilePasswordFormValues>({
    resolver: zodResolver(profilePasswordFormSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      toastService.success("Password updated", "Your password has been updated successfully");
      form.reset();
    },
    onError: () => {
      toastService.error("Error updating password", "Please try again");
    },
  });

  function onSubmit(data: ProfilePasswordFormValues) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("myProfile.password.form.currentPassword.label")}</FormLabel>
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
              <FormLabel>{t("myProfile.password.form.newPassword.label")}</FormLabel>
              <FormControl>
                <Input {...field} type="password" className="w-72" />
              </FormControl>
              <FormDescription>{t("myProfile.password.form.newPassword.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("myProfile.password.form.confirmPassword.label")}</FormLabel>
              <FormControl>
                <Input {...field} type="password" className="w-72" />
              </FormControl>
              <FormDescription>{t("myProfile.password.form.confirmPassword.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{t("myProfile.password.button")}</Button>
      </form>
    </Form>
  );
};

export default ProfilePasswordForm;
