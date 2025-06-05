"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { useMutation } from "@tanstack/react-query";
import toastService from "@/services/toast";
import { getAllParams } from "@/lib/urlParams";
import { getValidSearchParams } from "@/lib/data-table";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { saveShowStatusSchema, SaveShowStatusSchema, searchShowStatusesParamsCache } from "@/components/admin/filters/show-statuses/validation";
import filterService from "@/services/filter";
import SaveFilterForm from "@/components/common/SaveFilterForm";
import { ShowType } from "@/types/show-type";
import { SaveShowTypeSchema } from "./validation";
import { saveShowTypeSchema } from "./validation";

interface UpdateShowTypeSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
  showType: ShowType;
}

export function UpdateShowTypeSheet({ showType, ...props }: UpdateShowTypeSheetProps) {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchShowStatusesParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const queryClient = useQueryClient();
  const form = useForm<SaveShowTypeSchema>({
    resolver: zodResolver(saveShowTypeSchema),
    defaultValues: {
      id: showType.id,
      code: showType.code,
      name: showType.name,
    },
  });

  const updateShowTypeMutation = useMutation({
    mutationFn: (data: SaveShowTypeSchema) => filterService.updateShowType(showType.id!, data),
    onSuccess: (response) => {
      toastService.success(t("admin.filters.tabs.show-types.updateDialog.successMessage.title"), t("admin.filters.tabs.show-types.updateDialog.successMessage.description"));
      queryClient.setQueryData(["show-types", filteredSearch], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: oldData.content.map((item: ShowType) => (item.id === showType.id ? { ...item, ...response } : item)),
        };
      });
      props.onOpenChange?.(false);
    },
    onError: () => {
      toastService.error(t("admin.filters.tabs.show-types.updateDialog.errorMessage.title"), t("admin.filters.tabs.show-types.updateDialog.errorMessage.description"));
    },
  });

  function onSubmit(input: SaveShowTypeSchema) {
    updateShowTypeMutation.mutate(input);
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{t("admin.filters.tabs.show-types.updateDialog.title")}</SheetTitle>
          <SheetDescription>{t("admin.filters.tabs.show-types.updateDialog.description")}</SheetDescription>
        </SheetHeader>
        <SaveFilterForm form={form} onSubmit={onSubmit}>
          <SheetFooter className="gap-2 pt-2 sm:space-x-0">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                {t("admin.filters.tabs.show-types.updateDialog.buttons.cancel")}
              </Button>
            </SheetClose>
            <Button disabled={updateShowTypeMutation.isPending}>
              {updateShowTypeMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              {t("admin.filters.tabs.show-types.updateDialog.buttons.save")}
            </Button>
          </SheetFooter>
        </SaveFilterForm>
      </SheetContent>
    </Sheet>
  );
}
