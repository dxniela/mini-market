import { Product } from '../types';

/**
 * Obtiene los productos más baratos disponibles
 * @param products - Array de productos
 * @param top - Cantidad de productos a retornar (default: 3)
 * @returns Array de los productos más baratos disponibles
 */
export function getTopCheapestAvailable(products: Product[], top: number = 3): Product[] {
  return products
    // Filtrar productos con stock disponible
    .filter(product => product.isAvailable)
    // Ordenar por precio ascendente
    .sort((a, b) => a.price - b.price)
    // Tomar los N más baratos
    .slice(0, top);
}

/**
 * Obtiene el precio promedio de los productos disponibles
 * @param products - Array de productos
 * @returns Precio promedio de productos disponibles
 */
export function getAveragePrice(products: Product[]): number {
  const availableProducts = products.filter(product => product.isAvailable);
  
  if (availableProducts.length === 0) return 0;
  
  const total = availableProducts.reduce((sum, product) => sum + product.price, 0);
  return Number((total / availableProducts.length).toFixed(2));
}