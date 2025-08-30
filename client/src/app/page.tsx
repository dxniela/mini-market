import Link from "next/link";

/**
 * Página de inicio de Mini Market.
 *
 * Muestra:
 * - Sección principal de bienvenida con un llamado a la acción a los productos
 * - Sección de features/beneficios de la tienda
 * - Sección final con CTA destacado para explorar productos
 *
 * @component
 */
export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          Bienvenido a<span className="text-[#7fbfff]"> Mini Market</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Tu tienda online de productos de excelente calidad. Encuentra
          los mejores productos al mejor precio.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0080ff] hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
          >
            Ver Productos
          </Link>
        </div>
      </div>

      {/* Features Section: Beneficios */}
      <div className="mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#7fbfff] text-white mx-auto">
              🛡️
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-300">
              Productos de Calidad
            </h3>
            <p className="mt-2 text-base text-gray-400">
              Descubre todos los productos de las mejores marcas.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
              💰
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-300">
              Mejores Precios
            </h3>
            <p className="mt-2 text-base text-gray-400">
              Encuentra los productos más baratos aquí.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
              🚀
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-300">
              Entrega Rápida
            </h3>
            <p className="mt-2 text-base text-gray-400">
              Disponibilidad en tiempo real y gestión eficiente de inventario.
            </p>
          </div>
        </div>
      </div>

      {/* Llamada a la acción */}
      <div className="mt-20 bg-[#0080ff] rounded-lg">
        <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              ¿Listo para comprar?
            </h2>
            <p className="mt-3 text-lg text-blue-100">
              Explora nuestro catálogo completo de productos.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#0080ff] bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Explorar Productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
