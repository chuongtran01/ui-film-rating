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
import { searchGenresParamsCache, saveGenreSchema, SaveGenreSchema } from "@/components/admin/filters/genres/validation";
import filterService from "@/services/filter";
import SaveFilterForm from "@/components/common/SaveFilterForm";

interface CreateGenreSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {}

export function CreateGenreSheet({ ...props }: CreateGenreSheetProps) {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchGenresParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const queryClient = useQueryClient();
  const form = useForm<SaveGenreSchema>({
    resolver: zodResolver(saveGenreSchema),
    defaultValues: {
      id: undefined,
      code: "",
      name: "",
    },
  });

  const createGenreMutation = useMutation({
    mutationFn: (data: SaveGenreSchema) => filterService.createGenre(data),
    onSuccess: (response) => {
      toastService.success(t("admin.filters.tabs.genres.createDialog.successMessage.title"), t("admin.filters.tabs.genres.createDialog.successMessage.description"));
      queryClient.setQueryData(["genres", filteredSearch], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: [...oldData.content, response],
        };
      });
      props.onOpenChange?.(false);
    },
    onError: () => {
      toastService.error(t("admin.filters.tabs.genres.createDialog.errorMessage.title"), t("admin.filters.tabs.genres.createDialog.errorMessage.description"));
    },
  });

  function onSubmit(input: SaveGenreSchema) {
    createGenreMutation.mutate(input);
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{t("admin.filters.tabs.genres.createDialog.title")}</SheetTitle>
          <SheetDescription>{t("admin.filters.tabs.genres.createDialog.description")}</SheetDescription>
        </SheetHeader>
        <SaveFilterForm form={form} onSubmit={onSubmit}>
          <SheetFooter className="gap-2 pt-2 sm:space-x-0">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                {t("admin.filters.tabs.genres.createDialog.buttons.cancel")}
              </Button>
            </SheetClose>
            <Button disabled={createGenreMutation.isPending}>
              {createGenreMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              {t("admin.filters.tabs.genres.createDialog.buttons.create")}
            </Button>
          </SheetFooter>
        </SaveFilterForm>
      </SheetContent>
    </Sheet>
  );
}
