import { z } from "zod";

export const profileAccountFormSchema = z.object({
  // name: z.string().nonempty(),
  // email: z.string().email(),
  // location: z.string().optional(),
  // gender: z.string().optional(),
  // dateOfBirth: z.string().optional(),

  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z.string().email(),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});
