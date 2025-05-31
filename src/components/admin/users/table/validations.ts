import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server";
import * as z from "zod";

export const searchUsersParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault("createdAt,desc"),
  displayName: parseAsString.withDefault(""),
  email: parseAsString.withDefault(""),
  role: parseAsString.withDefault(""),
  gender: parseAsString.withDefault(""),
  active: parseAsString.withDefault(""),
  dob: parseAsArrayOf(z.coerce.number()).withDefault([]),
  createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
  updatedAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
});

export const updateUserSchema = z.object({
  displayName: z.string().optional(),
  email: z.string(),
  role: z.string().optional(),
  gender: z.string().optional(),
  dob: z.coerce.date().optional(),
  active: z.boolean(),
});

export type GetUsersSchema = Awaited<ReturnType<typeof searchUsersParamsCache.parse>>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
