import { FieldPath, UseFormReturn } from "react-hook-form";

import { FieldValues } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/enums/UserRole";
import { UserGender } from "@/enums/UserGender";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";

interface UpdateUserFormProps<T extends FieldValues> extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isUsersTable: boolean;
}

const UpdateUserForm = <T extends FieldValues>({ children, form, onSubmit, isUsersTable, ...props }: UpdateUserFormProps<T>) => {
  const t = useTranslations();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4">
        <FormField
          control={form.control}
          name={"displayName" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel required={true}>{t("updateUserForm.form.displayName.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("updateUserForm.form.displayName.placeholder")} {...field} className="resize-none w-60" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"email" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel required={true}>{t("updateUserForm.form.email.label")}</FormLabel>
              <FormControl>
                <Input className="resize-none w-60" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isUsersTable && (
          <FormField
            control={form.control}
            name={"role" as FieldPath<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel required={true}>{t("updateUserForm.form.role.label")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="capitalize w-40">
                      <SelectValue placeholder={t("updateUserForm.form.role.placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(UserRole).map((item) => (
                        <SelectItem key={item} value={item} className="capitalize">
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name={"gender" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("updateUserForm.form.gender.label")}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize w-40">
                    <SelectValue placeholder={t("updateUserForm.form.gender.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(UserGender).map((item) => (
                      <SelectItem key={item} value={item} className="capitalize">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"dob" as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("updateUserForm.form.dob.label")}</FormLabel>
              <FormControl>
                <Input type="date" className="w-40 block" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isUsersTable && (
          <FormField
            control={form.control}
            name={"active" as FieldPath<T>}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">{t("updateUserForm.form.active.label")}</FormLabel>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        {children}
      </form>
    </Form>
  );
};

export default UpdateUserForm;
