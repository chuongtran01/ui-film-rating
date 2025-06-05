"use client";

import { Loader, Trash } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toastService from "@/services/toast";
import { Show } from "@/types/show";
import showService from "@/services/show";

interface DeleteShowDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  show: Show;
  showTrigger?: boolean;
}

export function DeleteShowDialog({ show, showTrigger = true, ...props }: DeleteShowDialogProps) {
  const t = useTranslations();

  const isDesktop = useMediaQuery("(min-width: 640px)");
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: showService.deleteShow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shows"] });
      toastService.success(t("admin.filters.tabs.shows.deleteDialog.successMessage.title"), t("admin.filters.tabs.shows.deleteDialog.successMessage.description"));
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
            <DialogTitle>{t("admin.filters.tabs.shows.deleteDialog.title")}</DialogTitle>
            <DialogDescription>{t("admin.filters.tabs.shows.deleteDialog.description", { item: show.title })}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">{t("admin.filters.tabs.shows.deleteDialog.buttons.cancel")}</Button>
            </DialogClose>
            <Button aria-label="Delete selected rows" variant="destructive" onClick={() => deleteMutation.mutate(show.id)} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              {t("admin.filters.tabs.shows.deleteDialog.buttons.delete")}
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
            {t("admin.filters.tabs.shows.deleteDialog.buttons.delete")}
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("admin.filters.tabs.shows.deleteDialog.title")}</DrawerTitle>
          <DrawerDescription>{t("admin.filters.tabs.shows.deleteDialog.description", { item: show.title })}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button aria-label="Delete selected rows" variant="destructive" onClick={() => deleteMutation.mutate(show.id)} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
            {t("admin.filters.tabs.shows.deleteDialog.buttons.delete")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
