import { apiClient } from "./apiClient";
import { Product, ProductQuery, PaginatedResponse } from "../types";

// Obtener productos con filtros y paginación
export const getProducts = async (
  query: ProductQuery = {}
): Promise<PaginatedResponse<Product>> => {
  try {
    const { data } = await apiClient.get<PaginatedResponse<Product>>(
      "/api/products",
      {
        params: query,
      }
    );
    return data;
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Obtener producto por ID
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await apiClient.get<Product>(`/api/products/${id}`);
    return data;
  } catch (error: unknown) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Obtener los productos más baratos
export const getCheapestProducts = async (
  limit: number = 3
): Promise<Product[]> => {
  try {
    const { data } = await apiClient.get<Product[]>("/api/products/cheapest", {
      params: { limit },
    });
    return data;
  } catch (error: unknown) {
    console.error("Error fetching cheapest products:", error);
    throw error;
  }
};
