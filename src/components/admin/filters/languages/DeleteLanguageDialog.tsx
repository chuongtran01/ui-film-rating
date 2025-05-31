"use client";

import { Loader, Trash } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import filterService from "@/services/filter";
import { useTranslations } from "next-intl";
import { Language } from "@/types/language";
import toastService from "@/services/toast";

interface DeleteLanguageDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  language: Language;
  showTrigger?: boolean;
}

export function DeleteLanguageDialog({ language, showTrigger = true, ...props }: DeleteLanguageDialogProps) {
  const t = useTranslations();

  const isDesktop = useMediaQuery("(min-width: 640px)");
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: filterService.deleteLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
      toastService.success(t("admin.filters.tabs.languages.deleteDialog.successMessage.title"), t("admin.filters.tabs.languages.deleteDialog.successMessage.description"));
      props.onOpenChange?.(false);
    },
    onError: () => {
      toastService.error(t("admin.filters.tabs.languages.deleteDialog.errorMessage.title"), t("admin.filters.tabs.languages.deleteDialog.errorMessage.description"));
    },
  });

  if (isDesktop) {
    return (
      <Dialog {...props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("admin.filters.tabs.languages.deleteDialog.title")}</DialogTitle>
            <DialogDescription>{t("admin.filters.tabs.languages.deleteDialog.description", { item: language.name })}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">{t("admin.filters.tabs.genres.deleteDialog.buttons.cancel")}</Button>
            </DialogClose>
            <Button aria-label="Delete selected rows" variant="destructive" onClick={() => deleteMutation.mutate(language.id)} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              {t("admin.filters.tabs.languages.deleteDialog.buttons.delete")}
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
            {t("admin.filters.tabs.languages.deleteDialog.buttons.delete")}
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("admin.filters.tabs.languages.deleteDialog.title")}</DrawerTitle>
          <DrawerDescription>{t("admin.filters.tabs.languages.deleteDialog.description", { item: language.name })}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">{t("admin.filters.tabs.languages.deleteDialog.buttons.cancel")}</Button>
          </DrawerClose>
          <Button aria-label="Delete selected rows" variant="destructive" onClick={() => deleteMutation.mutate(language.id)} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
            {t("admin.filters.tabs.languages.deleteDialog.buttons.delete")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
