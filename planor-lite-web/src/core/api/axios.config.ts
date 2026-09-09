import axios, { type AxiosInstance } from "axios";
import { env } from "@/core/config";

export const apiClient: AxiosInstance = axios.create({
  //usa la URL base definida en la configuración de entorno (permite cambiar entre dev/prod sin tocar código).
  baseURL: env.API_URL,
  // El tiempo de espera para las peticiones, también configurable desde el entorno.
  timeout: env.API_TIMEOUT,
  // Encabezados por defecto para todas las peticiones, indicando que el contenido es JSON.
  headers: {
    'Content-Type': 'application/json',
  },
  // Habilitamos el envío de cookies en las peticiones para manejar la autenticación basada en cookies.
  withCredentials: true,
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);