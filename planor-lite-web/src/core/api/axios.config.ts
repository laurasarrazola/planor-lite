import axios, { type AxiosInstance } from "axios";
import { env } from "@/core/config";
import { authStorageService } from "@/core/services";

export const apiClient: AxiosInstance = axios.create({
  // Usa la URL base definida en la configuración de entorno.
  baseURL: env.API_URL,

  // El tiempo de espera para las peticiones.
  timeout: env.API_TIMEOUT,

  // Encabezados por defecto para todas las peticiones.
  headers: {
    'Content-Type': 'application/json',
  },

  // El proyecto utiliza JWT mediante Authorization, no autenticación por cookies.
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = authStorageService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);