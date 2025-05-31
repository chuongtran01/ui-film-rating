import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";
import * as z from "zod";

export const searchShowStatusesParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault("id,asc"),
  id: parseAsString.withDefault(""),
  name: parseAsString.withDefault(""),
});

export const saveShowStatusSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export type GetShowStatusesSchema = Awaited<ReturnType<typeof searchShowStatusesParamsCache.parse>>;
export type SaveShowStatusSchema = z.infer<typeof saveShowStatusSchema>;
