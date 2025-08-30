"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "../../../lib/api";
import { Product } from "../../../types";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        setError(null);
        const productData = await getProductById(productId);
        setProduct(productData);
      } catch (err) {
        setError("Producto no encontrado o error al cargar.");
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0080ff]"></div>
          <span className="ml-3 text-gray-300">Cargando producto...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-300 mb-4">
            Producto no encontrado
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0080ff] hover:bg-blue-700 transition-colors"
          >
            ← Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* tabs */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-[#0080ff]"
            >
              Inicio
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <Link
                href="/products"
                className="text-sm font-medium text-gray-300 hover:text-[#0080ff]"
              >
                Productos
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <span className="text-sm font-medium text-gray-500">
                {product.name}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Product detail */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Imagen del producto */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-lg object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span class="text-gray-500">Sin imagen disponible</span>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Sin imagen disponible</span>
                </div>
              )}
            </div>
          </div>

          {/* Información del producto */}
          <div className="flex flex-col justify-start">
            <div className="flex flex-row items-center justify-between mr-8">
              {/* Título */}
              <h1 className="text-[20px] font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Estado de disponibilidad */}
              <div className="mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {product.isAvailable ? "En stock" : "Sin stock"}
                </span>
              </div>
            </div>

            {/* Precio */}
            <div className="mb-6">
              <span className="text-[18px] font-bold text-[#0080ff]">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Categoría */}
            <div className="flex flex-row mb-6 ">
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                Categoría:
              </h3>
              <span className="text-gray-900 capitalize ml-1 mt-[-1px]">
                {product.category}
              </span>
            </div>

            {/* ID del producto */}
            <div className="flex flex-row mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                Código del producto:
              </h3>
              <span className="text-gray-500 font-mono text-sm ml-1">
                {product.id}
              </span>
            </div>

            {/* Botones de acción */}
            <div className="space-y-4">
              {/* Botón de favorito */}
              <button
                onClick={toggleFavorite}
                className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md transition-colors ${
                  isFavorite
                    ? "text-red-700 bg-red-100 hover:bg-red-200"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {isFavorite
                  ? "❤️ Quitar de favoritos"
                  : "🤍 Agregar a favoritos"}
              </button>

              {/* Botón de volver */}
              <div className="flex space-x-4">
                <Link
                  href="/products"
                  className="flex-1 bg-gray-600 text-white text-center py-3 px-6 rounded-md hover:bg-gray-700 transition-colors"
                >
                  ← Volver a productos
                </Link>

                {/* Botón de comprar */}
                <button
                  disabled={!product.isAvailable}
                  className={`flex-1 py-3 px-6 rounded-md font-medium transition-colors ${
                    product.isAvailable
                      ? "bg-[#0080ff] text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.isAvailable ? "Comprar ahora" : "No disponible"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Información del producto
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Nombre:</span>
            <span className="ml-2 text-gray-600">{product.name}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Precio:</span>
            <span className="ml-2 text-gray-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Categoría:</span>
            <span className="ml-2 text-gray-600 capitalize">
              {product.category}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Disponibilidad:</span>
            <span className="ml-2 text-gray-600">
              {product.isAvailable ? "Disponible" : "No disponible"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
