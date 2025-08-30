import { Router } from "express";
import { productsRoutes } from "./products.routes";

const router = Router();

// Registrar todas las rutas de la API
router.use("/api/products", productsRoutes);

export { router };
