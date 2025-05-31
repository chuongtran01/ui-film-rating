export interface Pagination {
  number: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface PaginationResponse<T> {
  content: T[];
  page: Pagination;
}

export interface PaginationParams {
  page: number;
  size: number;
  sort: string;
  direction: "asc" | "desc";
}
