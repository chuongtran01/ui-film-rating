"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { profileAccountFormSchema } from "@/app/[locale]/schemas/profile-account-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useMutation } from "@tanstack/react-query";
import userService from "@/services/user";
import { setPrincipalAction } from "@/redux/features/principal/principalSlice";
import toastService from "@/services/toast";
import UpdateUserForm from "../common/UpdateUserForm";
import { useTranslations } from "next-intl";

export type ProfileAccountFormValues = z.infer<typeof profileAccountFormSchema>;

const ProfileAccountForm = () => {
  const t = useTranslations();

  const principalState = useSelector((state: RootState) => state.principal);
  const dispatch = useDispatch();

  const defaultValues: Partial<ProfileAccountFormValues> = {
    displayName: principalState.displayName ?? "",
    dob: principalState.dob ?? "",
    email: principalState.email ?? "",
    gender: principalState.gender ?? undefined,
  };

  const form = useForm<ProfileAccountFormValues>({
    resolver: zodResolver(profileAccountFormSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: userService.updateMyAccountInformation,
    onSuccess: (data) => {
      toastService.success(t("myProfile.myAccount.successMessage.title"), t("myProfile.myAccount.successMessage.description"));

      dispatch(setPrincipalAction(data));
    },
    onError: () => {
      toastService.error(t("myProfile.myAccount.errorMessage.title"), t("myProfile.myAccount.errorMessage.description"));
    },
  });

  function onFormSubmit(data: ProfileAccountFormValues) {
    mutation.mutate(data);
  }

  return (
    <UpdateUserForm form={form} onSubmit={onFormSubmit} isUsersTable={false}>
      <Button type="submit" className="w-40" disabled={mutation.isPending}>
        {mutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
        {t("myProfile.myAccount.submitButton")}
      </Button>
    </UpdateUserForm>
  );
};

export default ProfileAccountForm;
