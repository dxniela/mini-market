import Link from "next/link";
import Image from "next/image";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden min-w-[250px]"
    >
      <div className="relative">
        {/* Imagen del producto */}
        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="object-cover w-full h-full"
              onError={(e) => {
                // Fallback si la imagen no carga
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.innerHTML = `
                  <div class="flex items-center justify-center w-full h-full bg-gray-300 text-gray-500">
                    <span class="text-sm">Sin imagen</span>
                  </div>
                `;
              }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-500">
              <span className="text-sm">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Badge de disponibilidad */}
        <div className="absolute top-2 right-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              product.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {product.isAvailable ? "En stock" : "Sin stock"}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Nombre del producto */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Precio y categoría */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-[#0080ff]">
            ${product.price.toFixed(2)}
          </p>

          {/* Categoría */}
          <span className="text-xs text-gray-500 capitalize">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
}