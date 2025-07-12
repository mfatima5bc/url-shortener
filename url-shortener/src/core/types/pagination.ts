export interface Pagination {
  page: number;
  limit: number;
}

export interface ListPaginatedParams<data> {
  page: number;
  hasNextPage: boolean;
  data: data[] | [];
}
