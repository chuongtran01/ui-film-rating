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
import { searchLanguagesParamsCache } from "@/components/admin/filters/languages/validation";
import filterService from "@/services/filter";
import SaveFilterForm from "@/components/common/SaveFilterForm";
import { Language } from "@/types/language";
import { saveLanguageSchema, SaveLanguageSchema } from "@/components/admin/filters/languages/validation";

interface UpdateLanguageSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
  language: Language;
}

export function UpdateLanguageSheet({ language, ...props }: UpdateLanguageSheetProps) {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchLanguagesParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const queryClient = useQueryClient();
  const form = useForm<SaveLanguageSchema>({
    resolver: zodResolver(saveLanguageSchema),
    defaultValues: {
      id: language.id,
      code: language.code,
      name: language.name,
    },
  });

  const updateLanguageMutation = useMutation({
    mutationFn: (data: SaveLanguageSchema) => filterService.updateLanguage(language.id!, data),
    onSuccess: (response) => {
      toastService.success(t("admin.filters.tabs.languages.updateDialog.successMessage.title"), t("admin.filters.tabs.languages.updateDialog.successMessage.description"));
      queryClient.setQueryData(["languages", filteredSearch], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: oldData.content.map((item: Language) => (item.id === language.id ? { ...item, ...response } : item)),
        };
      });
      props.onOpenChange?.(false);
    },
    onError: () => {
      toastService.error(t("admin.filters.tabs.languages.updateDialog.errorMessage.title"), t("admin.filters.tabs.languages.updateDialog.errorMessage.description"));
    },
  });

  function onSubmit(input: SaveLanguageSchema) {
    updateLanguageMutation.mutate(input);
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{t("admin.filters.tabs.languages.updateDialog.title")}</SheetTitle>
          <SheetDescription>{t("admin.filters.tabs.languages.updateDialog.description")}</SheetDescription>
        </SheetHeader>
        <SaveFilterForm form={form} onSubmit={onSubmit}>
          <SheetFooter className="gap-2 pt-2 sm:space-x-0">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                {t("admin.filters.tabs.languages.updateDialog.buttons.cancel")}
              </Button>
            </SheetClose>
            <Button disabled={updateLanguageMutation.isPending}>
              {updateLanguageMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              {t("admin.filters.tabs.languages.updateDialog.buttons.save")}
            </Button>
          </SheetFooter>
        </SaveFilterForm>
      </SheetContent>
    </Sheet>
  );
}
