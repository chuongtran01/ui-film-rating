import { z } from "zod";

export const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(50),
});
