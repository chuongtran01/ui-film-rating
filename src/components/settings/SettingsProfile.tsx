import { settingsProfileFormSchema } from "@/app/[locale]/schemas/settings-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";

const SettingsProfile = () => {
  const form = useForm<z.infer<typeof settingsProfileFormSchema>>({
    resolver: zodResolver(settingsProfileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      gender: "",
      dateOfBirth: "",
    },
  });

  const onSubmit = (values: z.infer<typeof settingsProfileFormSchema>) => {
    console.log(values);
  };

  return (
    <Card className="border-none shadow-none">
      <Form {...form}>
        <form id="loginForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="w-40 font-semibold">Display Name</FormLabel>
                <FormControl>
                  <Input className="w-64" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="w-40 font-semibold">Email</FormLabel>
                <FormControl>
                  <Input className="w-64" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="w-40 font-semibold">Location</FormLabel>
                <FormControl>
                  <Input className="w-64" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="w-40 font-semibold">Gender</FormLabel>
                <FormControl>
                  <Input className="w-32" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="w-40 font-semibold">Date of Birth</FormLabel>
                <FormControl>
                  <Input className="w-64" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <CardFooter className="mt-4 p-0">
        <Button form="loginForm" type="submit" className="bg-blue-500 hover:bg-blue-600">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SettingsProfile;
