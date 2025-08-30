/**
 * Genera un objeto de mensaje de error estándar
 * @param error_detail - Detalle interno del error
 * @param error_message - Mensaje que se mostrará al cliente
 * @param error_code - Código interno del error
 */
const get_msg = (
  error_detail: string,
  error_message: string,
  error_code: string
): Record<string, string> => {
  return {
    error: error_message,
    error_detail: error_detail,
    error_code: error_code,
  };
};

export { get_msg };