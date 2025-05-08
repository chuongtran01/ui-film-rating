import { z } from "zod";

export const addReviewFormSchema = z.object({
  rating: z.number().min(1).max(10),
  headline: z.string().nonempty(),
  review: z.string().nonempty(),
  spoiler: z.boolean(),
});
