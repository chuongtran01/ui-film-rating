import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";
import * as z from "zod";

export const searchStreamingPlatformsParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault("id,asc"),
  code: parseAsString.withDefault(""),
  name: parseAsString.withDefault(""),
});

export const saveStreamingPlatformSchema = z.object({
  id: z.number().optional(),
  code: z.string().min(1, { message: "Code is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  logo: z.string().optional(),
  url: z.string().optional(),
});

export type GetStreamingPlatformsSchema = Awaited<ReturnType<typeof searchStreamingPlatformsParamsCache.parse>>;
export type SaveStreamingPlatformSchema = z.infer<typeof saveStreamingPlatformSchema>;
