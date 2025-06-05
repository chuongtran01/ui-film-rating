import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";
import * as z from "zod";

export const searchShowsParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault("id,asc"),
  id: parseAsString.withDefault(""),
  name: parseAsString.withDefault(""),
});

export const streamingPlatformSchema = z.object({
  id: z.string(),
  url: z.string().url().optional(),
});

export const saveShowSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  releaseDate: z.coerce.date().optional(),
  duration: z.number().optional(),
  poster: z.string().optional(),
  trailer: z.string().optional(),
  rating: z.number().optional(),
  status: z.string().optional(),
  language: z.string().optional(),
  genres: z.array(z.string()).optional(),
  streamingPlatforms: z.array(streamingPlatformSchema).optional(),
  countries: z.array(z.string()).optional(),
});

export const createShowSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  releaseDate: z.coerce.date().optional(),
  duration: z.number().optional(),
});

export type GetShowsSchema = Awaited<ReturnType<typeof searchShowsParamsCache.parse>>;
export type SaveShowSchema = z.infer<typeof saveShowSchema>;
export type CreateShowSchema = z.infer<typeof createShowSchema>;
