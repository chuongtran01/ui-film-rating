"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { User } from "@/types/user";
import userService from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import toastService from "@/services/toast";
import UpdateUserForm from "@/components/common/UpdateUserForm";
import { useTranslations } from "next-intl";
import { searchUsersParamsCache, UpdateUserSchema, updateUserSchema } from "@/components/admin/users/table/validations";
import { getAllParams } from "@/lib/urlParams";
import { useSearchParams } from "next/navigation";
import { getValidSearchParams } from "@/lib/data-table";

interface UpdateUserSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
  user: User;
}

export function UpdateUserSheet({ user, ...props }: UpdateUserSheetProps) {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchUsersParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const queryClient = useQueryClient();
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      displayName: user.displayName ?? "",
      email: user.email ?? "",
      role: user.role ?? "",
      gender: user.gender ?? "",
      dob: user.dob ?? "",
      active: user.active,
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (data: UpdateUserSchema) => userService.updateUser(user?.id ?? "", data),
    onSuccess: (response) => {
      toastService.success(t("admin.users.updateUserSheet.successMessage.title"), t("admin.users.updateUserSheet.successMessage.description"));
      queryClient.setQueryData(["users", filteredSearch], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: oldData.content.map((item: User) => (item.id === user?.id ? { ...item, ...response } : item)),
        };
      });
      props.onOpenChange?.(false);
    },
    onError: () => {
      toastService.error(t("admin.users.updateUserSheet.errorMessage.title"), t("admin.users.updateUserSheet.errorMessage.description"));
    },
  });

  function onSubmit(input: UpdateUserSchema) {
    updateUserMutation.mutate(input);
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{t("admin.users.updateUserSheet.title")}</SheetTitle>
          <SheetDescription>{t("admin.users.updateUserSheet.description")}</SheetDescription>
        </SheetHeader>
        <UpdateUserForm form={form} onSubmit={onSubmit} isUsersTable={true}>
          <SheetFooter className="gap-2 pt-2 sm:space-x-0">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                {t("admin.users.updateUserSheet.buttons.cancel")}
              </Button>
            </SheetClose>
            <Button disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              {t("admin.users.updateUserSheet.buttons.save")}
            </Button>
          </SheetFooter>
        </UpdateUserForm>
      </SheetContent>
    </Sheet>
  );
}
