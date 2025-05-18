import { z } from "zod";

export const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;

export const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50).regex(passwordRegex, {
    message: "Password must be at least 8 characters long and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.",
  }),
});
