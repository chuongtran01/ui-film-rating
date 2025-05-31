import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";
import * as z from "zod";

export const searchCountriesParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault("id,asc"),
  id: parseAsString.withDefault(""),
  name: parseAsString.withDefault(""),
});

export const saveCountrySchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  flag: z.string().optional(),
});

export type GetCountriesSchema = Awaited<ReturnType<typeof searchCountriesParamsCache.parse>>;
export type SaveCountrySchema = z.infer<typeof saveCountrySchema>;
