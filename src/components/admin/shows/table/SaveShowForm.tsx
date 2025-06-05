import * as React from "react";
import { FieldPath, UseFormReturn } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import filterService from "@/services/filter";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { StreamingPlatform } from "@/types/streaming-platform";

interface SaveShowFormProps<T extends FieldValues> extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
}

const SaveShowForm = <T extends FieldValues>({ form, onSubmit }: SaveShowFormProps<T>) => {
  const t = useTranslations();
  const [openStreamingPlatforms, setOpenStreamingPlatforms] = React.useState(false);
  const [openGenres, setOpenGenres] = React.useState(false);
  const [openCountries, setOpenCountries] = React.useState(false);

  const { data: filters } = useQuery({
    queryKey: ["filters"],
    queryFn: () => filterService.getFilters(),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4">
        <FormField
          control={form.control}
          name={"title" as FieldPath<T>}
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
          name={"description" as FieldPath<T>}
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
          name={"releaseDate" as FieldPath<T>}
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
          name={"duration" as FieldPath<T>}
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

        <FormField
          control={form.control}
          name={"rating" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("admin.shows.saveShowForm.form.rating.label")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={10}
                  className="resize-none w-60"
                  placeholder={t("admin.shows.saveShowForm.form.rating.placeholder")}
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"status" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("admin.shows.saveShowForm.form.status.label")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-60">
                    <SelectValue placeholder={t("admin.shows.saveShowForm.form.status.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {filters?.showStatuses?.map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"genres" as FieldPath<T>}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("admin.shows.saveShowForm.form.genres.label")}</FormLabel>
              <FormControl>
                <Popover open={openGenres} onOpenChange={setOpenGenres}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={openGenres} className="w-60 justify-between">
                      {field.value?.length > 0 ? `${field.value.length} genres selected` : t("admin.shows.saveShowForm.form.genres.placeholder")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-0">
                    <Command>
                      <CommandInput placeholder={t("admin.shows.saveShowForm.form.genres.search")} />
                      <CommandEmpty>{t("admin.shows.saveShowForm.form.genres.noResults")}</CommandEmpty>
                      <CommandGroup>
                        {filters?.genres?.map((genre) => (
                          <CommandItem
                            key={genre.id}
                            onSelect={() => {
                              const currentValue: string[] = field.value || [];
                              const newValue = currentValue.includes(genre.id) ? currentValue.filter((id: string) => id !== genre.id) : [...currentValue, genre.id];
                              field.onChange(newValue);
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", field.value?.includes(genre.id) ? "opacity-100" : "opacity-0")} />
                            {genre.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>

              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground flex items-center">{t("admin.shows.saveShowForm.form.genres.selected")}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value?.map((genreId: string) => {
                      const genre = filters?.genres?.find((g) => g.id === genreId);
                      if (!genre) return null;
                      return (
                        <Badge key={genre.id} variant="secondary">
                          {genre.name}
                          <button
                            type="button"
                            className="ml-1 ring-offset-background rounded-full outline-none"
                            onClick={() => {
                              field.onChange(field.value.filter((id: string) => id !== genre.id));
                            }}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"streamingPlatforms" as FieldPath<T>}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("admin.shows.saveShowForm.form.streamingPlatforms.label")}</FormLabel>
              <FormControl>
                <Popover open={openStreamingPlatforms} onOpenChange={setOpenStreamingPlatforms}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={openStreamingPlatforms} className="w-60 justify-between">
                      {field.value?.length > 0 ? `${field.value.length} platforms selected` : t("admin.shows.saveShowForm.form.streamingPlatforms.placeholder")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-0">
                    <Command>
                      <CommandInput placeholder={t("admin.shows.saveShowForm.form.streamingPlatforms.search")} />
                      <CommandEmpty>{t("admin.shows.saveShowForm.form.streamingPlatforms.noResults")}</CommandEmpty>
                      <CommandGroup>
                        {filters?.streamingPlatforms?.map((platform) => (
                          <CommandItem
                            key={platform.id}
                            onSelect={() => {
                              const currentValue = (field.value || []) as Array<{ id: string; url: string }>;
                              const newValue = currentValue.some((p) => p.id === platform.id) ? currentValue.filter((p) => p.id !== platform.id) : [...currentValue, { id: platform.id, url: "" }];
                              field.onChange(newValue);
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", (field.value as Array<{ id: string; url: string }>)?.some((p) => p.id === platform.id) ? "opacity-100" : "opacity-0")} />
                            {platform.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>

              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground flex items-center">{t("admin.shows.saveShowForm.form.streamingPlatforms.selected")}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(field.value as Array<{ id: string; url: string }>)?.map((platform) => {
                      const platformInfo = filters?.streamingPlatforms?.find((p) => p.id === platform.id);
                      if (!platformInfo) return null;
                      return (
                        <div key={platform.id} className="flex flex-col gap-2">
                          <Badge variant="secondary">
                            {platformInfo.name}
                            <button
                              type="button"
                              className="ml-1 ring-offset-background rounded-full outline-none"
                              onClick={() => {
                                const currentValue = field.value as Array<{ id: string; url: string }>;
                                field.onChange(currentValue.filter((p) => p.id !== platform.id));
                              }}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                          <Input
                            type="url"
                            placeholder="Enter platform URL"
                            value={platform.url}
                            onChange={(e) => {
                              const currentValue = field.value as Array<{ id: string; url: string }>;
                              const newValue = currentValue.map((p) => (p.id === platform.id ? { ...p, url: e.target.value } : p));
                              field.onChange(newValue);
                            }}
                            className="w-60"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"language" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("admin.shows.saveShowForm.form.language.label")}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-60">
                    <SelectValue placeholder={t("admin.shows.saveShowForm.form.language.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {filters?.languages?.map((language) => (
                      <SelectItem key={language.id} value={language.id}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"countries" as FieldPath<T>}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("admin.shows.saveShowForm.form.countries.label")}</FormLabel>
              <FormControl>
                <Popover open={openCountries} onOpenChange={setOpenCountries}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={openCountries} className="w-60 justify-between">
                      {field.value?.length > 0 ? `${field.value.length} countries selected` : t("admin.shows.saveShowForm.form.countries.placeholder")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-0">
                    <Command>
                      <CommandInput placeholder={t("admin.shows.saveShowForm.form.countries.search")} />
                      <CommandEmpty>{t("admin.shows.saveShowForm.form.countries.noResults")}</CommandEmpty>
                      <CommandGroup>
                        {filters?.countries?.map((country) => (
                          <CommandItem
                            key={country.id}
                            onSelect={() => {
                              const currentValue: string[] = field.value || [];
                              const newValue = currentValue.includes(country.id) ? currentValue.filter((id: string) => id !== country.id) : [...currentValue, country.id];
                              field.onChange(newValue);
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", field.value?.includes(country.id) ? "opacity-100" : "opacity-0")} />
                            {country.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>

              {field.value?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground flex items-center">{t("admin.shows.saveShowForm.form.countries.selected")}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value?.map((countryId: string) => {
                      const country = filters?.countries?.find((c) => c.id === countryId);
                      if (!country) return null;
                      return (
                        <Badge key={country.id} variant="secondary">
                          {country.name}
                          <button
                            type="button"
                            className="ml-1 ring-offset-background rounded-full outline-none"
                            onClick={() => {
                              field.onChange(field.value.filter((id: string) => id !== country.id));
                            }}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">{t("admin.shows.saveShowForm.form.buttons.save")}</Button>
        </div>
      </form>
    </Form>
  );
};

export default SaveShowForm;
