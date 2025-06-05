import { Country } from "@/types/country";
import { Genre } from "@/types/genre";
import { Language } from "@/types/language";
import { ShowStatus } from "@/types/show-status";
import { StreamingPlatform } from "@/types/streaming-platform";

export interface Show {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  duration: number; // in minutes
  poster: string; // URL to poster image
  trailer: string; // URL to trailer video
  rating: number; // Average rating (0.0 to 10.0)
  status: ShowStatus;
  language: Language;
  genres: Genre[];
  streamingPlatforms: StreamingPlatform[];
  countries: Country[];
  createdAt?: Date;
  updatedAt?: Date;
}
