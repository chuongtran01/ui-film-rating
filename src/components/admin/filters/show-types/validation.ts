import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";
import * as z from "zod";

export const searchShowTypesParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault("createdAt,desc"),
  code: parseAsString.withDefault(""),
  name: parseAsString.withDefault(""),
});

export const saveShowTypeSchema = z.object({
  id: z.number().optional(),
  code: z.string().min(1, { message: "Code is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export type GetShowTypesSchema = Awaited<ReturnType<typeof searchShowTypesParamsCache.parse>>;
export type SaveShowTypeSchema = z.infer<typeof saveShowTypeSchema>;
