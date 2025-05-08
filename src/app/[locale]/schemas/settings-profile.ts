import { z } from "zod";

export const settingsProfileFormSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  location: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
});
