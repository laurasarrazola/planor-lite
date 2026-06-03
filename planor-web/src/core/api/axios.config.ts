import axios, { type AxiosInstance } from 'axios'
import { env } from '@/core/config'
import { authStorageService } from '@/core/services'

/**
 * Instancia del cliente Axios con configuración base
 * @constant {AxiosInstance} apiClient - Instancia de Axios preconfigurada para las peticiones a la API
 */
// Creamos una instancia de Axios con la configuración base para las peticiones a la API, incluyendo la URL base, el tiempo de espera y los encabezados por defecto. También habilitamos el envío de cookies con `withCredentials` para manejar la autenticación basada en cookies.
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

// Interceptor para manejar respuestas de la API y errores de autenticación
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    
    // Limpiar storage en caso de 401 (Unauthorized) o 403 (Forbidden)
    if (status === 401 || status === 403) {
      authStorageService.clearAuth()
      
      // Redirigir a login si no estamos ya ahí
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)