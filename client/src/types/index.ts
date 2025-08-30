export interface Product {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
}

export interface ProductQuery {
  search?: string;
  sort?: "price" | "name";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  available?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}