import { apiService } from "@/services/api";
import { PaginationResponse } from "@/interfaces/pagination";
import { Genre } from "@/types/genre";
import { Country } from "@/types/country";
import { Language } from "@/types/language";
import { StreamingPlatform } from "@/types/streaming-platform";
import { ShowStatus } from "@/types/show-status";
import { Filter } from "@/types/filter";
import { GetGenresSchema } from "@/components/admin/filters/genres/validation";
import { GetShowStatusesSchema } from "@/components/admin/filters/show-statuses/validation";
import { GetLanguagesSchema } from "@/components/admin/filters/languages/validation";
import { GetCountriesSchema } from "@/components/admin/filters/countries/validation";
import { GetStreamingPlatformsSchema } from "@/components/admin/filters/streaming-platform/validation";
import { GetShowTypesSchema } from "@/components/admin/filters/show-types/validation";
import { ShowType } from "@/types/show-type";

const API_PREFIX = "filters";

const filterService = {
  getFilters: async (): Promise<Filter> => {
    const response = await apiService.get(`${API_PREFIX}`);
    return response.data;
  },

  getGenres: async (search: Partial<GetGenresSchema>): Promise<PaginationResponse<Genre>> => {
    const response = await apiService.get(`${API_PREFIX}/genres`, {
      params: {
        ...search,
      },
    });
    return response.data;
  },

  getAllGenres: async (): Promise<Genre[]> => {
    const response = await apiService.get(`${API_PREFIX}/genres/all`);
    return response.data;
  },

  createGenre: async (data: Genre): Promise<Genre> => {
    const response = await apiService.post(`${API_PREFIX}/genres`, data);
    return response.data;
  },

  updateGenre: async (id: number, data: Genre): Promise<Genre> => {
    const response = await apiService.put(`${API_PREFIX}/genres/${id}`, data);
    return response.data;
  },

  deleteGenre: async (id: number): Promise<void> => {
    await apiService.delete(`${API_PREFIX}/genres/${id}`);
  },

  getLanguages: async (search: Partial<GetLanguagesSchema>): Promise<PaginationResponse<Language>> => {
    const response = await apiService.get(`${API_PREFIX}/languages`, {
      params: {
        ...search,
      },
    });
    return response.data;
  },

  getAllLanguages: async (): Promise<Language[]> => {
    const response = await apiService.get(`${API_PREFIX}/languages/all`);
    return response.data;
  },

  createLanguage: async (data: Language): Promise<Language> => {
    const response = await apiService.post(`${API_PREFIX}/languages`, data);
    return response.data;
  },

  updateLanguage: async (id: number, data: Language): Promise<Language> => {
    const response = await apiService.put(`${API_PREFIX}/languages/${id}`, data);
    return response.data;
  },

  deleteLanguage: async (id: number): Promise<void> => {
    await apiService.delete(`${API_PREFIX}/languages/${id}`);
  },

  getCountries: async (search: Partial<GetCountriesSchema>): Promise<PaginationResponse<Country>> => {
    const response = await apiService.get(`${API_PREFIX}/countries`, {
      params: {
        ...search,
      },
    });
    return response.data;
  },

  getAllCountries: async (): Promise<Country[]> => {
    const response = await apiService.get(`${API_PREFIX}/countries/all`);
    return response.data;
  },

  createCountry: async (data: Country): Promise<Country> => {
    const response = await apiService.post(`${API_PREFIX}/countries`, data);
    return response.data;
  },

  updateCountry: async (id: number, data: Country): Promise<Country> => {
    const response = await apiService.put(`${API_PREFIX}/countries/${id}`, data);
    return response.data;
  },

  deleteCountry: async (id: number): Promise<void> => {
    await apiService.delete(`${API_PREFIX}/countries/${id}`);
  },

  getShowStatuses: async (search: Partial<GetShowStatusesSchema>): Promise<PaginationResponse<ShowStatus>> => {
    const response = await apiService.get(`${API_PREFIX}/show-statuses`, {
      params: {
        ...search,
      },
    });
    return response.data;
  },

  getAllShowStatuses: async (): Promise<ShowStatus[]> => {
    const response = await apiService.get(`${API_PREFIX}/show-statuses/all`);
    return response.data;
  },

  createShowStatus: async (data: ShowStatus): Promise<ShowStatus> => {
    const response = await apiService.post(`${API_PREFIX}/show-statuses`, data);
    return response.data;
  },

  updateShowStatus: async (id: number, data: ShowStatus): Promise<ShowStatus> => {
    const response = await apiService.put(`${API_PREFIX}/show-statuses/${id}`, data);
    return response.data;
  },

  deleteShowStatus: async (id: number): Promise<void> => {
    await apiService.delete(`${API_PREFIX}/show-statuses/${id}`);
  },

  getStreamingPlatforms: async (search: Partial<GetStreamingPlatformsSchema>): Promise<PaginationResponse<StreamingPlatform>> => {
    const response = await apiService.get(`${API_PREFIX}/streaming-platforms`, {
      params: {
        ...search,
      },
    });
    return response.data;
  },

  getAllStreamingPlatforms: async (): Promise<StreamingPlatform[]> => {
    const response = await apiService.get(`${API_PREFIX}/streaming-platforms/all`);
    return response.data;
  },

  createStreamingPlatform: async (data: StreamingPlatform): Promise<StreamingPlatform> => {
    const response = await apiService.post(`${API_PREFIX}/streaming-platforms`, data);
    return response.data;
  },

  updateStreamingPlatform: async (id: number, data: StreamingPlatform): Promise<StreamingPlatform> => {
    const response = await apiService.put(`${API_PREFIX}/streaming-platforms/${id}`, data);
    return response.data;
  },

  deleteStreamingPlatform: async (id: number): Promise<void> => {
    await apiService.delete(`${API_PREFIX}/streaming-platforms/${id}`);
  },

  getShowTypes: async (search: Partial<GetShowTypesSchema>): Promise<PaginationResponse<ShowType>> => {
    const response = await apiService.get(`${API_PREFIX}/show-types`, {
      params: {
        ...search,
      },
    });
    return response.data;
  },

  getAllShowTypes: async (): Promise<ShowType[]> => {
    const response = await apiService.get(`${API_PREFIX}/show-types/all`);
    return response.data;
  },

  createShowType: async (data: ShowType): Promise<ShowType> => {
    const response = await apiService.post(`${API_PREFIX}/show-types`, data);
    return response.data;
  },

  updateShowType: async (id: number, data: ShowType): Promise<ShowType> => {
    const response = await apiService.put(`${API_PREFIX}/show-types/${id}`, data);
    return response.data;
  },

  deleteShowType: async (id: number): Promise<void> => {
    await apiService.delete(`${API_PREFIX}/show-types/${id}`);
  },
};

export default filterService;
