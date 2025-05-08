"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { addReviewFormSchema } from "@/app/[locale]/schemas/add-review";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AddShowReview() {
  const form = useForm<z.infer<typeof addReviewFormSchema>>({
    resolver: zodResolver(addReviewFormSchema),
    defaultValues: {
      rating: 0,
      headline: "",
      review: "",
      spoiler: undefined,
    },
  });

  const [hoverRating, setHoverRating] = useState(0);

  const onFormSubmit = (values: z.infer<typeof addReviewFormSchema>) => {
    console.log(values);
  };

  return (
    <SheetContent className="mx-auto bg-white border-none flex flex-col p-0 min-h-screen [&>button:first-of-type]:hidden">
      {/* Header */}
      <SheetHeader className="p-4 pb-0">
        <SheetTitle>Add User Review</SheetTitle>
      </SheetHeader>

      <div className="bg-gradient-to-br from-gray-700 to-gray-900 flex items-center p-3 gap-2">
        <img src="https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg" alt="Warfare" className="w-15 h-16 rounded-md object-cover" />
        <div>
          <div className="text-white font-semibold">Someday or One day</div>
          <div className="text-xs text-gray-300">R · 2025 · 1h 35m</div>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form id="addReviewForm" className="flex-1 flex flex-col p-4 gap-4" onSubmit={form.handleSubmit(onFormSubmit)}>
          {/* Rating */}
          <div className="flex flex-col justify-start gap-1 mb-2">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex items-center flex-col gap-2">
                  <FormLabel className="font-semibold flex flex-row w-full justify-between">
                    Your rating
                    <span className="ml-2 text-gray-500 font-semibold">{field.value ? `${field.value}/10` : "?"}</span>
                  </FormLabel>
                  <FormControl className="flex justify-start w-full">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => field.onChange(val)}
                          onMouseEnter={() => setHoverRating(val)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none"
                        >
                          <Star className={`w-6 h-6 ${(hoverRating || field.value) >= val ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Headline */}
          <FormField
            control={form.control}
            name="headline"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="font-semibold">Headline</FormLabel>
                <FormControl>
                  <Input type="text" className="border border-gray-300 rounded px-3 py-2 w-full" placeholder="Title of your review" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Review */}
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="font-semibold">Review</FormLabel>
                <FormControl>
                  <Textarea className="border border-gray-300 rounded px-3 py-2 w-full min-h-[120px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Spoiler */}
          <FormField
            control={form.control}
            name="spoiler"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 border border-gray-300 rounded-lg p-3 bg-gray-50">
                <FormLabel className="font-semibold">Does this review contain spoilers?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value === true ? "true" : field.value === false ? "false" : ""}
                    onValueChange={(val) => field.onChange(val === "true")}
                    className="flex flex-col items-start gap-2"
                  >
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="!mt-0">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="!mt-0">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex flex-col gap-3 p-4">
        {/* Conditions */}
        <div className="text-xs text-gray-500 mt-2">
          I agree to the{" "}
          <a href="#" className="text-blue-700 font-semibold underline">
            Conditions of Use
          </a>
          . The data I'm submitting is true and not copyrighted by a third party.
        </div>

        {/* Buttons fixed at the bottom */}
        <div className="flex flex-col gap-2">
          <Button form="addReviewForm" type="submit" className="bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition">
            Submit
          </Button>
          <SheetClose asChild>
            <Button type="button" className="bg-gray-100 text-blue-700 py-2 font-semibold hover:bg-gray-200 transition">
              Cancel
            </Button>
          </SheetClose>
        </div>
      </div>
    </SheetContent>
  );
}
