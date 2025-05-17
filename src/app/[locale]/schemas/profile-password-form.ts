import { z } from "zod";

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

export const profilePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(6, { message: "Password must be at least 6 characters." }).regex(passwordRegex, {
      message: "Password must include at least 1 number and 1 special character.",
    }),
    newPassword: z.string().min(6, { message: "Password must be at least 6 characters." }).regex(passwordRegex, {
      message: "Password must include at least 1 number and 1 special character.",
    }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }).regex(passwordRegex, {
      message: "Password must include at least 1 number and 1 special character.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
