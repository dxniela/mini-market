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