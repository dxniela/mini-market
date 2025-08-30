import axios, { AxiosInstance } from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

/**
 * Instancia de Axios configurada con la URL base y headers por defecto
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});