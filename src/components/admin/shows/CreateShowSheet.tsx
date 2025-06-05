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
import showService from "@/services/show";
import { CreateShowSchema, createShowSchema, searchShowsParamsCache } from "@/components/admin/shows/validation";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTitle, SheetDescription, SheetFooter, SheetContent, SheetClose, SheetHeader } from "@/components/ui/sheet";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreateShowSheet = ({ ...props }) => {
  const t = useTranslations();

  const params = getAllParams(useSearchParams());
  const searchParams = searchShowsParamsCache.parse(params);
  const filteredSearch = getValidSearchParams(searchParams);

  const queryClient = useQueryClient();
  const form = useForm<CreateShowSchema>({
    resolver: zodResolver(createShowSchema),
    defaultValues: {
      title: "",
      description: "",
      releaseDate: undefined,
      duration: 0,
    },
  });

  const createShowMutation = useMutation({
    mutationFn: (data: CreateShowSchema) => showService.createShow(data),
    onSuccess: (response) => {
      toastService.success(t("admin.shows.createShow.successMessage.title"), t("admin.shows.createShow.successMessage.description"));
      queryClient.invalidateQueries({ queryKey: ["shows", filteredSearch] });
      form.reset();
    },
    onError: () => {
      toastService.error(t("admin.shows.createShow.errorMessage.title"), t("admin.shows.createShow.errorMessage.description"));
    },
  });

  function onSubmit(input: CreateShowSchema) {
    // createShowMutation.mutate(input);
    console.log("input", input);
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{t("admin.shows.createShow.title")}</SheetTitle>
          <SheetDescription>{t("admin.shows.createShow.description")}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required={true}>{t("admin.shows.saveShowForm.form.title.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("admin.shows.saveShowForm.form.title.placeholder")} {...field} className="resize-none w-96" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.shows.saveShowForm.form.description.label")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("admin.shows.saveShowForm.form.description.placeholder")} {...field} className="resize-none w-96 h-32" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="releaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.shows.saveShowForm.form.releaseDate.label")}</FormLabel>
                  <FormControl>
                    <Input type="date" className="resize-none w-60 block" placeholder={t("admin.shows.saveShowForm.form.releaseDate.placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.shows.saveShowForm.form.duration.label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="resize-none w-60"
                      placeholder={t("admin.shows.saveShowForm.form.duration.placeholder")}
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="gap-2 pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  {t("admin.shows.createShow.buttons.cancel")}
                </Button>
              </SheetClose>
              <Button disabled={createShowMutation.isPending}>
                {createShowMutation.isPending && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
                {t("admin.shows.createShow.buttons.create")}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateShowSheet;
