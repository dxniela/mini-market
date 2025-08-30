import { Router } from "express";
import { ProductController } from "../controllers/products.controller";
import productsData from "../data/products.json";
import { getTopCheapestAvailable } from "../utils/cheapest.util";

const router = Router();
const productController = new ProductController();

// GET /api/products
router.get("/", productController.getProducts);

// GET /api/products/:id
router.get("/:id", productController.getProductById);

// GET /api/products/top-cheapest
router.get("/cheapest", (req, res) => {
  const top = parseInt(req.query.top as string) || 3;
  const topProducts = getTopCheapestAvailable(productsData, top);
  res.json(topProducts);
});

export const productsRoutes = router;
