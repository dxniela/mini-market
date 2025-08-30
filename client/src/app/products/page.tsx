"use client";

import { useState, useEffect, useCallback } from "react";
import { getProducts } from "../../lib/api";
import ProductCard from "../../components/ProductCard";
import { Product, PaginatedResponse } from "../../types";

/**
 * Página de listado de productos.
 *
 * Permite explorar el catálogo completo de productos con las siguientes funcionalidades:
 * - Búsqueda por nombre o categoría
 * - Ordenamiento por nombre o precio (ascendente / descendente)
 * - Filtrado por disponibilidad (en stock / sin stock)
 * - Paginación de resultados
 *
 * Hooks:
 * - useState: maneja productos, filtros, paginación, loading y error
 * - useEffect: carga los productos cuando cambian los filtros o la página
 * - useCallback: memoriza la función loadProducts para evitar recrearla innecesariamente
 *
 * Estado:
 * - products: array de productos cargados
 * - loading: indica si se está cargando la información
 * - error: mensaje de error en caso de fallo
 * - search: término de búsqueda
 * - sortBy: campo por el que se ordena ("name" o "price")
 * - sortOrder: orden de clasificación ("asc" o "desc")
 * - availableOnly: filtro de disponibilidad (true/false/undefined)
 * - currentPage: página actual de la paginación
 * - pagination: objeto con información de paginación (total, totalPages, limit, page)
 *
 * Funciones:
 * - loadProducts: carga los productos desde el backend según los filtros y la página actual
 * - setCurrentPage: actualiza la página actual (para la paginación)
 * - reset filtros: reinicia todos los filtros a sus valores por defecto
 *
 * Render:
 * - Muestra estado de carga, error, grid de productos, filtros y controles de paginación.
 *
 * @component
 */
export default function ProductsPage() {
  // Estados
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"price" | "name">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [availableOnly, setAvailableOnly] = useState<boolean | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  /**
   * Función para cargar productos desde la API según los filtros actuales.
   * Actualiza los estados products, pagination, loading y error.
   */
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response: PaginatedResponse<Product> = await getProducts({
        search: search || undefined,
        sort: sortBy,
        order: sortOrder,
        page: currentPage,
        limit: 12,
        available: availableOnly,
      });

      setProducts(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError("Error al cargar los productos.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  }, [search, sortBy, sortOrder, availableOnly, currentPage]);

  // Cargar productos cuando cambien los filtros
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Reset página cuando cambien filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy, sortOrder, availableOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-300">Productos</h1>
        <p className="mt-2 text-gray-400">
          Explora nuestro catálogo de productos.
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Buscador */}
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Buscar
            </label>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Ordenar por */}
          <div>
            <label
              htmlFor="sort"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ordenar por
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "price" | "name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
            </select>
          </div>

          {/* Orden */}
          <div>
            <label
              htmlFor="order"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Orden
            </label>
            <select
              id="order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>

          {/* Filtro disponibilidad */}
          <div>
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Disponibilidad
            </label>
            <select
              id="availability"
              value={
                availableOnly === undefined ? "" : availableOnly.toString()
              }
              onChange={(e) => {
                const value = e.target.value;
                setAvailableOnly(value === "" ? undefined : value === "true");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="true">En stock</option>
              <option value="false">Sin stock</option>
            </select>
          </div>
        </div>

        {/* Botón limpiar filtros */}
        <div className="mt-4">
          <button
            onClick={() => {
              setSearch("");
              setSortBy("name");
              setSortOrder("asc");
              setAvailableOnly(undefined);
              setCurrentPage(1);
            }}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0080ff]"></div>
          <span className="ml-2 text-gray-400">Cargando productos...</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-400">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={loadProducts}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products grid */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-400">
                Intenta cambiar los filtros de búsqueda.
              </p>
            </div>
          ) : (
            <>
              {/* Resultados info */}
              <div className="mb-6">
                <p className="text-sm text-gray-300">
                  Mostrando {products.length} de {pagination.total} productos
                  {search && ` para "${search}"`}
                </p>
              </div>

              {/* Grid de productos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 mb-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Paginación */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === pagination.totalPages}
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                    </button>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Página{" "}
                        <span className="font-medium">{currentPage}</span> de{" "}
                        <span className="font-medium">
                          {pagination.totalPages}
                        </span>
                      </p>
                    </div>
                    <div>
                      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ←
                        </button>

                        {/* Números de página */}
                        {Array.from(
                          { length: pagination.totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                              page === currentPage
                                ? "z-10 bg-[#0080ff] text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === pagination.totalPages}
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          →
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
