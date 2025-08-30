import { Product, ProductQuery, PaginatedResponse } from '../types';
import productsData from '../data/products.json';

export class ProductService {
  private products: Product[] = productsData;

  async getProducts(query: ProductQuery): Promise<PaginatedResponse<Product>> {
    let filteredProducts = [...this.products];

    // Filtrar por búsqueda
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por disponibilidad
    if (query.available !== undefined) {
      filteredProducts = filteredProducts.filter(product =>
        product.isAvailable === query.available
      );
    }

    // Ordenar
    const sortField = query.sort || 'name';
    const sortOrder = query.order || 'asc';

    filteredProducts.sort((a, b) => {
      let valueA: any = a[sortField];
      let valueB: any = b[sortField];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });

    // Paginación
    const page = Math.max(1, query.page || 1);
    const limit = Math.max(1, Math.min(100, query.limit || 10));
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit)
      }
    };
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.find(product => product.id === id) || null;
  }

  async getAvailableProducts(): Promise<Product[]> {
    return this.products.filter(product => product.isAvailable);
  }
}