import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Market - Tienda Online",
  description: "Tu tienda online de productos de seguridad y equipamiento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        {/* Header/Navigation */}
        <header className="bg-gray-800 shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <h1 className="text-xl font-bold text-white">
                  🛒 Mini Market
                </h1>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Inicio
                </Link>
                <Link
                  href="/products"
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Productos
                </Link>
              </nav>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Link
                  href="/products"
                  className=" text-gray-600 px-3 py-2 rounded-md text-md font-medium"
                >
                  Productos
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-sm text-gray-400">
                © 2025 Mini Market. Desarrollado por Daniela Ramírez.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
