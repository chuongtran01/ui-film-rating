import { Genre } from "@/types/genre";
import { Country } from "@/types/country";
import { Language } from "@/types/language";
import { StreamingPlatform } from "@/types/streaming-platform";
import { ShowStatus } from "@/types/show-status";

export type Filter = {
  genres: Genre[];
  streamingPlatforms: StreamingPlatform[];
  countries: Country[];
  showStatuses: ShowStatus[];
  languages: Language[];
};
