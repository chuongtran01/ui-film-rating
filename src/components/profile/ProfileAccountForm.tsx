"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { profileAccountFormSchema } from "@/app/[locale]/schemas/profile-account-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { EnumGender } from "@/enums/EnumGender";
import { useMutation } from "@tanstack/react-query";
import userService from "@/services/user";
import { setPrincipalAction } from "@/redux/features/principal/principalSlice";

export type ProfileAccountFormValues = z.infer<typeof profileAccountFormSchema>;

const genders = [
  { value: EnumGender.MALE, label: "Male" },
  { value: EnumGender.FEMALE, label: "Female" },
  { value: EnumGender.OTHER, label: "Other" },
];

const ProfileAccountForm = () => {
  const principalState = useSelector((state: RootState) => state.principal);
  const dispatch = useDispatch();

  const defaultValues: Partial<ProfileAccountFormValues> = {
    displayName: principalState.displayName ?? "",
    dob: principalState.dob ? parseISO(principalState.dob) : undefined,
    email: principalState.email ?? "",
    gender: principalState.gender ?? undefined,
  };

  const form = useForm<ProfileAccountFormValues>({
    resolver: zodResolver(profileAccountFormSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: userService.updateMyAccountInformation,
    onSuccess: (data) => {
      toast({
        title: "Account updated",
        description: "Your account has been updated",
      });

      dispatch(setPrincipalAction(data));
    },
    onError: () => {
      toast({
        title: "Account update failed",
        description: "Please try again",
      });
    },
  });

  function onFormSubmit(data: ProfileAccountFormValues) {
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} className="w-72" value={field.value} />
              </FormControl>
              <FormDescription>This is the name that will be displayed on your profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="w-72 bg-gray-100" value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "yyyy-MM-dd") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender.value} value={gender.value}>
                      {gender.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
};

export default ProfileAccountForm;
