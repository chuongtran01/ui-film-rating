import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";
import * as z from "zod";

export const searchLanguagesParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault("id,asc"),
  code: parseAsString.withDefault(""),
  name: parseAsString.withDefault(""),
});

export const saveLanguageSchema = z.object({
  id: z.number().optional(),
  code: z.string().min(1, { message: "Code is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export type GetLanguagesSchema = Awaited<ReturnType<typeof searchLanguagesParamsCache.parse>>;
export type SaveLanguageSchema = z.infer<typeof saveLanguageSchema>;
