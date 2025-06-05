import { FieldPath, UseFormReturn } from "react-hook-form";

import { FieldValues } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

interface SaveStreamingPlatformFormProps<T extends FieldValues> extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
}

const SaveStreamingPlatformForm = <T extends FieldValues>({ children, form, onSubmit }: SaveStreamingPlatformFormProps<T>) => {
  const t = useTranslations();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4">
        <FormField
          control={form.control}
          name={"code" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel required={true}>{t("admin.filters.tabs.streaming-platforms.saveStreamingPlatformForm.code.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("admin.filters.tabs.streaming-platforms.saveStreamingPlatformForm.code.placeholder")} {...field} className="resize-none w-60" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"name" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel required={true}>{t("admin.filters.tabs.streaming-platforms.saveStreamingPlatformForm.name.label")}</FormLabel>
              <FormControl>
                <Input className="resize-none w-60" placeholder={t("admin.filters.tabs.streaming-platforms.saveStreamingPlatformForm.name.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"logo" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("admin.filters.tabs.streaming-platforms.saveStreamingPlatformForm.logo.label")}</FormLabel>
              <FormControl>
                <Input className="resize-none w-60" placeholder={t("admin.filters.tabs.streaming-platforms.saveStreamingPlatformForm.logo.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"url" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("admin.filters.tabs.streaming-platforms.saveStreamingPlatformForm.url.label")}</FormLabel>
              <FormControl>
                <Input className="resize-none w-60" placeholder={t("admin.filters.tabs.streaming-platforms.saveStreamingPlatformForm.url.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {children}
      </form>
    </Form>
  );
};

export default SaveStreamingPlatformForm;
