import axios, { type AxiosInstance } from 'axios'
import { env } from '@/core/config'
import { authStorageService } from '@/core/services'

/**
 * Axios client instance configured with base settings
 * @constant {AxiosInstance} apiClient - Pre-configured axios instance for API requests
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: env.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

/**
 * Response interceptor to handle unauthorized access
 * Clears storage and redirects to login on 401/403
 */
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