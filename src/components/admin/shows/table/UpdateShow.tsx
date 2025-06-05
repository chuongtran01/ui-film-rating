"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { useMutation } from "@tanstack/react-query";
import toastService from "@/services/toast";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { getAllParams } from "@/lib/urlParams";
import { getValidSearchParams } from "@/lib/data-table";
import { Show } from "@/types/show";
import { SaveShowSchema, searchShowsParamsCache, saveShowSchema } from "@/components/admin/shows/validation";
import showService from "@/services/show";
import SaveShowForm from "@/components/admin/shows/table/SaveShowForm";

interface UpdateShowProps extends React.ComponentPropsWithRef<typeof Sheet> {
  show: Show;
}

export function UpdateShow({ show }: UpdateShowProps) {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchShowsParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const queryClient = useQueryClient();
  const form = useForm<SaveShowSchema>({
    resolver: zodResolver(saveShowSchema),
    defaultValues: {
      id: show.id,
      title: show.title,
      description: show.description,
      releaseDate: show.releaseDate,
      duration: show.duration,
      poster: show.poster,
      trailer: show.trailer,
      rating: show.rating,
      status: show.status.toString(),
      language: show.language.id,
      genres: show.genres.map((genre) => genre.id),
      streamingPlatforms: show.streamingPlatforms.map((platform) => platform.id),
      countries: show.countries.map((country) => country.id),
    },
  });

  const updateShowMutation = useMutation({
    mutationFn: (data: SaveShowSchema) => showService.updateShow(show.id, data),
    onSuccess: (response) => {
      toastService.success(t("admin.shows.updateShow.successMessage.title"), t("admin.shows.updateShow.successMessage.description"));
      queryClient.invalidateQueries({ queryKey: ["shows", filteredSearch] });
      form.reset();
    },
    onError: () => {
      toastService.error(t("admin.shows.updateShow.errorMessage.title"), t("admin.shows.updateShow.errorMessage.description"));
    },
  });

  function onSubmit(input: SaveShowSchema) {
    updateShowMutation.mutate(input);
  }

  return <SaveShowForm form={form} onSubmit={onSubmit} />;
}
