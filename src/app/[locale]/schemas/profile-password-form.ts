import { z } from "zod";
import { passwordRegex } from "@/app/[locale]/schemas/signup-form";

export const profilePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(8, { message: "Password must be at least 8 characters." }).regex(passwordRegex, {
      message: "Password must be at least 8 characters long and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.",
    }),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }).regex(passwordRegex, {
      message: "Password must be at least 8 characters long and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.",
    }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters." }).regex(passwordRegex, {
      message: "Password must be at least 8 characters long and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
