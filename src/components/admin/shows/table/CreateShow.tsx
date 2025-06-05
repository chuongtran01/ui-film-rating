"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { useMutation } from "@tanstack/react-query";
import toastService from "@/services/toast";
import { getAllParams } from "@/lib/urlParams";
import { getValidSearchParams } from "@/lib/data-table";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { searchShowsParamsCache, saveShowSchema, SaveShowSchema } from "../validation";
import showService from "@/services/show";
import SaveShowForm from "./SaveShowForm";

export function CreateShow({ ...props }) {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchShowsParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const queryClient = useQueryClient();
  const form = useForm<SaveShowSchema>({
    resolver: zodResolver(saveShowSchema),
    defaultValues: {
      id: 0,
      title: "",
      description: "",
      releaseDate: undefined,
      duration: 0,
      poster: "",
      trailer: "",
      rating: 0,
      status: "",
      streamingPlatforms: [],
      genres: [],
      countries: [],
      language: "",
    },
  });

  const createShowMutation = useMutation({
    mutationFn: (data: SaveShowSchema) => showService.createShow(data),
    onSuccess: (response) => {
      toastService.success(t("admin.shows.createShow.successMessage.title"), t("admin.shows.createShow.successMessage.description"));
      queryClient.invalidateQueries({ queryKey: ["shows", filteredSearch] });
      form.reset();
    },
    onError: () => {
      toastService.error(t("admin.shows.createShow.errorMessage.title"), t("admin.shows.createShow.errorMessage.description"));
    },
  });

  function onSubmit(input: SaveShowSchema) {
    createShowMutation.mutate(input);
    // console.log("input", input);
  }

  return <SaveShowForm form={form} onSubmit={onSubmit} />;
}
