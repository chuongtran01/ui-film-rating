import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";
import * as z from "zod";

export const searchGenresParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault("id,asc"),
  code: parseAsString.withDefault(""),
  name: parseAsString.withDefault(""),
});

export const saveGenreSchema = z.object({
  id: z.number().optional(),
  code: z.string().min(1, { message: "Code is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export type GetGenresSchema = Awaited<ReturnType<typeof searchGenresParamsCache.parse>>;
export type SaveGenreSchema = z.infer<typeof saveGenreSchema>;
