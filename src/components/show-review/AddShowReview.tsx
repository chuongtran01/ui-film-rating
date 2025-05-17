"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { addReviewFormSchema } from "@/app/[locale]/schemas/add-review";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "../ui/checkbox";
import ReviewScoreContainer from "../ReviewScoreContainer";

interface AddShowReviewProps {
  onCancel: () => void;
}

export default function AddShowReview({ onCancel }: AddShowReviewProps) {
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
    <Card className="flex flex-col border-none shadow-none p-0 gap-4">
      {/* Header */}
      <CardHeader className="p-0">
        <CardDescription className="flex items-center gap-2">
          <img src="https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg" alt="Warfare" className="w-15 h-16 rounded-md object-cover" />
          <div>
            <div className="text-lg font-semibold">Someday or One day</div>
            <div className="text-xs text-gray-600">R · 2025 · 1h 35m</div>
          </div>
        </CardDescription>
      </CardHeader>

      <Separator className="my-2" />

      <CardContent className="p-0">
        <Form {...form}>
          <form id="addReviewForm" className="flex-1 flex flex-col gap-4" onSubmit={form.handleSubmit(onFormSubmit)}>
            {/* Rating */}
            <div className="flex flex-col justify-start gap-1 mb-2">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="flex items-center flex-row justify-center gap-2">
                    <ReviewScoreContainer score={field.value} className="w-16 h-16 text-4xl" />
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
                    <Input type="text" className="w-full" {...field} />
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
                    <Textarea className="w-full min-h-[120px]" {...field} />
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
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-semibold !mt-0">Contain Spoilers?</FormLabel>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      {/* Form */}

      <CardFooter className="flex flex-col gap-4 p-0">
        <div className="flex flex-row gap-4 w-full">
          <Button type="button" variant="secondary" className="font-semibold flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button form="addReviewForm" type="submit" className="bg-primary text-primary-foreground font-semibold flex-1">
            Submit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
