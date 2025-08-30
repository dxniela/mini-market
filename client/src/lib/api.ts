import { apiClient } from "./apiClient";
import { Product, ProductQuery, PaginatedResponse } from "../types";

/**
 * Obtiene productos desde la API con filtros y paginación.
 * @param query Filtros de búsqueda, orden y disponibilidad
 * @returns Lista de productos paginada
 * @throws Error si la petición falla
 */
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

/**
 * Obtiene un producto por su ID.
 * @param id ID del producto
 * @returns Producto correspondiente
 * @throws Error si la petición falla
 */
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await apiClient.get<Product>(`/api/products/${id}`);
    return data;
  } catch (error: unknown) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Obtiene los productos más baratos, limitado por cantidad.
 * @param limit Cantidad de productos a obtener (por defecto 3)
 * @returns Lista de productos más baratos
 * @throws Error si la petición falla
 */
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
