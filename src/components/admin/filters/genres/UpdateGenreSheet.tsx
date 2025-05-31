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
import { useTranslations } from "next-intl";
import { Genre } from "@/types/genre";
import { saveGenreSchema, searchGenresParamsCache } from "./validation";
import { SaveGenreSchema } from "./validation";
import filterService from "@/services/filter";
import SaveFilterForm from "@/components/common/SaveFilterForm";
import { useSearchParams } from "next/navigation";
import { getAllParams } from "@/lib/urlParams";
import { getValidSearchParams } from "@/lib/data-table";

interface UpdateGenreSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
  genre: Genre;
}

export function UpdateGenreSheet({ genre, ...props }: UpdateGenreSheetProps) {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchGenresParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const queryClient = useQueryClient();
  const form = useForm<SaveGenreSchema>({
    resolver: zodResolver(saveGenreSchema),
    defaultValues: {
      id: genre.id,
      name: genre.name,
    },
  });

  const updateGenreMutation = useMutation({
    mutationFn: (data: SaveGenreSchema) => filterService.updateGenre(genre.id, data),
    onSuccess: (response) => {
      toastService.success(t("admin.filters.tabs.genres.updateDialog.successMessage.title"), t("admin.filters.tabs.genres.updateDialog.successMessage.description"));
      queryClient.setQueryData(["genres", filteredSearch], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: oldData.content.map((item: Genre) => (item.id === genre.id ? { ...item, ...response } : item)),
        };
      });
      props.onOpenChange?.(false);
    },
    onError: () => {
      toastService.error(t("admin.filters.tabs.genres.updateDialog.errorMessage.title"), t("admin.filters.tabs.genres.updateDialog.errorMessage.description"));
    },
  });

  function onSubmit(input: SaveGenreSchema) {
    updateGenreMutation.mutate(input);
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{t("admin.filters.tabs.genres.updateDialog.title")}</SheetTitle>
          <SheetDescription>{t("admin.filters.tabs.genres.updateDialog.description")}</SheetDescription>
        </SheetHeader>
        <SaveFilterForm form={form} onSubmit={onSubmit}>
          <SheetFooter className="gap-2 pt-2 sm:space-x-0">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                {t("admin.filters.tabs.genres.updateDialog.buttons.cancel")}
              </Button>
            </SheetClose>
            <Button disabled={updateGenreMutation.isPending}>
              {updateGenreMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              {t("admin.filters.tabs.genres.updateDialog.buttons.save")}
            </Button>
          </SheetFooter>
        </SaveFilterForm>
      </SheetContent>
    </Sheet>
  );
}
