import { FieldPath, UseFormReturn } from "react-hook-form";

import { FieldValues } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

interface SaveCountryFormProps<T extends FieldValues> extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
}

const SaveCountryForm = <T extends FieldValues>({ children, form, onSubmit }: SaveCountryFormProps<T>) => {
  const t = useTranslations();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4">
        <FormField
          control={form.control}
          name={"code" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel required={true}>{t("admin.filters.tabs.countries.saveCountryForm.code.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("admin.filters.tabs.countries.saveCountryForm.code.placeholder")} {...field} className="resize-none w-60" />
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
              <FormLabel required={true}>{t("admin.filters.tabs.countries.saveCountryForm.name.label")}</FormLabel>
              <FormControl>
                <Input className="resize-none w-60" placeholder={t("admin.filters.tabs.countries.saveCountryForm.name.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"flag" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("admin.filters.tabs.countries.saveCountryForm.flag.label")}</FormLabel>
              <FormControl>
                <Input className="resize-none w-60" placeholder={t("admin.filters.tabs.countries.saveCountryForm.flag.placeholder")} {...field} />
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

export default SaveCountryForm;
