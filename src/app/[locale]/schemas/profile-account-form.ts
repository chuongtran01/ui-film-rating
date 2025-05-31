import { z } from "zod";

export const profileAccountFormSchema = z.object({
  displayName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z.string().email(),
  dob: z.coerce
    .date({
      required_error: "A date of birth is required.",
    })
    .refine(
      (date) => {
        return date < new Date();
      },
      {
        message: "Date of birth must be in the past.",
      }
    )
    .optional(),
  gender: z.string().optional(),
});
