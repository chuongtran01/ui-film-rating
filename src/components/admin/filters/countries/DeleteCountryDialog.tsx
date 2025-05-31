"use client";

import { Loader, Trash } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Genre } from "@/types/genre";
import filterService from "@/services/filter";
import { useTranslations } from "next-intl";
import { Country } from "@/types/country";
import toastService from "@/services/toast";

interface DeleteCountryDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  country: Country;
  showTrigger?: boolean;
}

export function DeleteCountryDialog({ country, showTrigger = true, ...props }: DeleteCountryDialogProps) {
  const t = useTranslations();

  const isDesktop = useMediaQuery("(min-width: 640px)");
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: filterService.deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      toastService.success(t("admin.filters.tabs.countries.deleteDialog.successMessage.title"), t("admin.filters.tabs.countries.deleteDialog.successMessage.description"));
      props.onOpenChange?.(false);
    },
    onError: () => {
      toastService.error(t("admin.filters.tabs.countries.deleteDialog.errorMessage.title"), t("admin.filters.tabs.countries.deleteDialog.errorMessage.description"));
    },
  });

  if (isDesktop) {
    return (
      <Dialog {...props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("admin.filters.tabs.countries.deleteDialog.title")}</DialogTitle>
            <DialogDescription>{t("admin.filters.tabs.countries.deleteDialog.description", { item: country.name })}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">{t("admin.filters.tabs.countries.deleteDialog.buttons.cancel")}</Button>
            </DialogClose>
            <Button aria-label="Delete selected rows" variant="destructive" onClick={() => deleteMutation.mutate(country.id)} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              {t("admin.filters.tabs.countries.deleteDialog.buttons.delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash className="mr-2 size-4" aria-hidden="true" />
            {t("admin.filters.tabs.countries.deleteDialog.buttons.delete")}
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("admin.filters.tabs.countries.deleteDialog.title")}</DrawerTitle>
          <DrawerDescription>{t("admin.filters.tabs.countries.deleteDialog.description", { item: country.name })}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button aria-label="Delete selected rows" variant="destructive" onClick={() => deleteMutation.mutate(country.id)} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
            {t("admin.filters.tabs.countries.deleteDialog.buttons.delete")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
