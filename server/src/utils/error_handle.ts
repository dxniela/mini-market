import { Response } from "express";
import { get_msg } from "./utils";

// Función para manejar errores HTTP con códigos personalizados
const handle_http = (
  res: Response,
  error_code: string,
  error_message: string,
  status_code: number = 500
): void => {
  const error_code_message = error_codes[error_code] || "Unknown error";

  res
    .status(status_code)
    .json(get_msg(error_message, error_code_message, error_code));
};

// Catálogo de códigos de error SOLO para productos
const error_codes: Record<string, string> = {
  // Productos
  "2001": "Error creando producto",
  "2002": "Error listando productos",
  "2003": "Error obteniendo producto",

  // Errores genéricos
  "4001": "Parámetro inválido",
  "4041": "Recurso no encontrado",
  "5001": "Error interno del servidor",
};

export { handle_http };
