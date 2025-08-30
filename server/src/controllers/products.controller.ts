import { Request, Response } from "express";
import { ProductService } from "../services/products.service";
import { ProductQuery } from "../types";
import { handle_http } from "../utils/error_handle";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const query: ProductQuery = {
        search: req.query.search as string,
        sort: req.query.sort as "price" | "name",
        order: req.query.order as "asc" | "desc",
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit
          ? parseInt(req.query.limit as string)
          : undefined,
        available: req.query.available
          ? req.query.available === "true"
          : undefined,
      };

      const result = await this.productService.getProducts(query);
      res.json(result);
    } catch (error: any) {
      console.error("Error getting products:", error);
      handle_http(
        res,
        "2002",
        error.message || "Error al obtener los productos"
      );
    }
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        return handle_http(res, "4001", "ID de producto es requerido", 400);
      }

      const product = await this.productService.getProductById(id);

      if (!product) {
        return handle_http(res, "4041", "Producto no encontrado", 404);
      }

      res.json(product);
    } catch (error: any) {
      console.error("Error getting product by ID:", error);
      handle_http(res, "2003", error.message || "Error al obtener el producto");
    }
  };
}
