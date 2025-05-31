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
import { SaveCountrySchema, saveCountrySchema, searchCountriesParamsCache } from "@/components/admin/filters/countries/validation";
import filterService from "@/services/filter";
import { useSearchParams } from "next/navigation";
import { getAllParams } from "@/lib/urlParams";
import { getValidSearchParams } from "@/lib/data-table";
import { Country } from "@/types/country";
import SaveCountryForm from "./SaveCountryForm";

interface UpdateCountrySheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
  country: Country;
}

export function UpdateCountrySheet({ country, ...props }: UpdateCountrySheetProps) {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchCountriesParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const queryClient = useQueryClient();
  const form = useForm<SaveCountrySchema>({
    resolver: zodResolver(saveCountrySchema),
    defaultValues: {
      id: country.id,
      name: country.name,
      flag: country.flag,
    },
  });

  const updateCountryMutation = useMutation({
    mutationFn: (data: SaveCountrySchema) => filterService.updateCountry(country.id, data),
    onSuccess: (response) => {
      toastService.success(t("admin.filters.tabs.countries.updateDialog.successMessage.title"), t("admin.filters.tabs.countries.updateDialog.successMessage.description"));
      queryClient.setQueryData(["countries", filteredSearch], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: oldData.content.map((item: Country) => (item.id === country.id ? { ...item, ...response } : item)),
        };
      });
      props.onOpenChange?.(false);
    },
    onError: () => {
      toastService.error(t("admin.filters.tabs.countries.updateDialog.errorMessage.title"), t("admin.filters.tabs.countries.updateDialog.errorMessage.description"));
    },
  });

  function onSubmit(input: SaveCountrySchema) {
    updateCountryMutation.mutate(input);
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{t("admin.filters.tabs.countries.updateDialog.title")}</SheetTitle>
          <SheetDescription>{t("admin.filters.tabs.countries.updateDialog.description")}</SheetDescription>
        </SheetHeader>
        <SaveCountryForm form={form} onSubmit={onSubmit}>
          <SheetFooter className="gap-2 pt-2 sm:space-x-0">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                {t("admin.filters.tabs.countries.updateDialog.buttons.cancel")}
              </Button>
            </SheetClose>
            <Button disabled={updateCountryMutation.isPending}>
              {updateCountryMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              {t("admin.filters.tabs.countries.updateDialog.buttons.save")}
            </Button>
          </SheetFooter>
        </SaveCountryForm>
      </SheetContent>
    </Sheet>
  );
}
