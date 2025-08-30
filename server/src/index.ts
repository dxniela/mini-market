import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use(router);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    message: "Endpoint no encontrado",
    path: req.originalUrl,
  });
});

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);
    res.status(500).json({
      error: "Internal server error",
      message: "Algo salió mal en el servidor",
    });
  }
);

app.use("/images", express.static(path.join(__dirname, "../public/images")));

async function main() {
  console.log("Initializing server...");

  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

main();

export default app;
