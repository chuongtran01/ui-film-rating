import { apiService } from "@/services/api";
import { PaginationResponse } from "@/interfaces/pagination";
import { GetShowsSchema, SaveShowSchema } from "@/components/admin/shows/validation";
import { Show } from "@/types/show";

const API_PREFIX = "shows";

const showService = {
  getShows: async (search: Partial<GetShowsSchema>): Promise<PaginationResponse<Show>> => {
    const response = await apiService.get(`${API_PREFIX}`, {
      params: {
        ...search,
      },
    });
    return response.data;
  },

  getShowById: async (id: string): Promise<Show> => {
    const response = await apiService.get(`${API_PREFIX}/${id}`);
    return response.data;
  },

  createShow: async (data: SaveShowSchema): Promise<Show> => {
    const response = await apiService.post(`${API_PREFIX}`, data);
    return response.data;
  },

  updateShow: async (id: number, data: SaveShowSchema): Promise<Show> => {
    const response = await apiService.put(`${API_PREFIX}/${id}`, data);
    return response.data;
  },

  deleteShow: async (id: number): Promise<void> => {
    await apiService.delete(`${API_PREFIX}/${id}`);
  },
};

export default showService;
