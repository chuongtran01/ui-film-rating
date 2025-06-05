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
import filterService from "@/services/filter";
import { useSearchParams } from "next/navigation";
import { getAllParams } from "@/lib/urlParams";
import { getValidSearchParams } from "@/lib/data-table";
import { StreamingPlatform } from "@/types/streaming-platform";
import { saveStreamingPlatformSchema, SaveStreamingPlatformSchema, searchStreamingPlatformsParamsCache } from "./validation";
import SaveStreamingPlatformForm from "./SaveStreamingPlatformForm";

interface UpdateStreamingPlatformSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
  streamingPlatform: StreamingPlatform;
}

export function UpdateStreamingPlatformSheet({ streamingPlatform, ...props }: UpdateStreamingPlatformSheetProps) {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchStreamingPlatformsParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const queryClient = useQueryClient();
  const form = useForm<SaveStreamingPlatformSchema>({
    resolver: zodResolver(saveStreamingPlatformSchema),
    defaultValues: {
      id: streamingPlatform.id,
      code: streamingPlatform.code,
      name: streamingPlatform.name,
      logo: streamingPlatform.logo,
      url: streamingPlatform.url,
    },
  });

  const updateStreamingPlatformMutation = useMutation({
    mutationFn: (data: SaveStreamingPlatformSchema) => filterService.updateStreamingPlatform(streamingPlatform.id!, data),
    onSuccess: (response) => {
      toastService.success(t("admin.filters.tabs.streaming-platforms.updateDialog.successMessage.title"), t("admin.filters.tabs.streaming-platforms.updateDialog.successMessage.description"));
      queryClient.setQueryData(["streaming-platforms", filteredSearch], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: oldData.content.map((item: StreamingPlatform) => (item.id === streamingPlatform.id ? { ...item, ...response } : item)),
        };
      });
      props.onOpenChange?.(false);
    },
    onError: () => {
      toastService.error(t("admin.filters.tabs.streaming-platforms.updateDialog.errorMessage.title"), t("admin.filters.tabs.streaming-platforms.updateDialog.errorMessage.description"));
    },
  });

  function onSubmit(input: SaveStreamingPlatformSchema) {
    updateStreamingPlatformMutation.mutate(input);
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{t("admin.filters.tabs.streaming-platforms.updateDialog.title")}</SheetTitle>
          <SheetDescription>{t("admin.filters.tabs.streaming-platforms.updateDialog.description")}</SheetDescription>
        </SheetHeader>
        <SaveStreamingPlatformForm form={form} onSubmit={onSubmit}>
          <SheetFooter className="gap-2 pt-2 sm:space-x-0">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                {t("admin.filters.tabs.streaming-platforms.updateDialog.buttons.cancel")}
              </Button>
            </SheetClose>
            <Button disabled={updateStreamingPlatformMutation.isPending}>
              {updateStreamingPlatformMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              {t("admin.filters.tabs.streaming-platforms.updateDialog.buttons.save")}
            </Button>
          </SheetFooter>
        </SaveStreamingPlatformForm>
      </SheetContent>
    </Sheet>
  );
}
