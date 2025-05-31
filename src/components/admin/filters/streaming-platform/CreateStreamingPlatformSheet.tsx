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
import { searchStreamingPlatformsParamsCache, saveStreamingPlatformSchema, SaveStreamingPlatformSchema } from "@/components/admin/filters/streaming-platform/validation";
import filterService from "@/services/filter";
import SaveStreamingPlatformForm from "@/components/admin/filters/streaming-platform/SaveStreamingPlatformForm";

export function CreateStreamingPlatformSheet({ ...props }) {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchStreamingPlatformsParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const queryClient = useQueryClient();
  const form = useForm<SaveStreamingPlatformSchema>({
    resolver: zodResolver(saveStreamingPlatformSchema),
    defaultValues: {
      id: "",
      name: "",
      logo: "",
      url: "",
    },
  });

  const createStreamingPlatformMutation = useMutation({
    mutationFn: (data: SaveStreamingPlatformSchema) => filterService.createStreamingPlatform(data),
    onSuccess: (response) => {
      toastService.success(t("admin.filters.tabs.streaming-platforms.createDialog.successMessage.title"), t("admin.filters.tabs.streaming-platforms.createDialog.successMessage.description"));
      queryClient.setQueryData(["streaming-platforms", filteredSearch], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: [...oldData.content, response],
        };
      });
      props.onOpenChange?.(false);
    },
    onError: () => {
      toastService.error(t("admin.filters.tabs.streaming-platforms.createDialog.errorMessage.title"), t("admin.filters.tabs.streaming-platforms.createDialog.errorMessage.description"));
    },
  });

  function onSubmit(input: SaveStreamingPlatformSchema) {
    createStreamingPlatformMutation.mutate(input);
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{t("admin.filters.tabs.streaming-platforms.createDialog.title")}</SheetTitle>
          <SheetDescription>{t("admin.filters.tabs.streaming-platforms.createDialog.description")}</SheetDescription>
        </SheetHeader>
        <SaveStreamingPlatformForm form={form} onSubmit={onSubmit}>
          <SheetFooter className="gap-2 pt-2 sm:space-x-0">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                {t("admin.filters.tabs.streaming-platforms.createDialog.buttons.cancel")}
              </Button>
            </SheetClose>
            <Button disabled={createStreamingPlatformMutation.isPending}>
              {createStreamingPlatformMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              {t("admin.filters.tabs.streaming-platforms.createDialog.buttons.create")}
            </Button>
          </SheetFooter>
        </SaveStreamingPlatformForm>
      </SheetContent>
    </Sheet>
  );
}
