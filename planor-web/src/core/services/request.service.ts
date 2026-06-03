/* El archivo request.service.ts se utiliza para centralizar y estandarizar las solicitudes HTTP en la aplicación. Proporciona métodos para realizar solicitudes GET, POST, PUT, PATCH y DELETE utilizando Axios, y maneja opciones como mostrar un loader o un toast de error. Además, permite configurar encabezados personalizados y manejar errores de manera consistente.*/
import type { AxiosError, AxiosRequestConfig } from 'axios' // Tipos de axios para tipar errores y config
import { apiClient } from '@/core/api' // Instancia axios centralizada (cliente HTTP)
import type { RequestOptions } from '@/core/api' // Tipo que define opciones adicionales por petición

class RequestService {
  // Opciones por defecto que se aplican a todas las peticiones si no se pasan explícitamente
  private readonly DEFAULT_OPTIONS: RequestOptions = {
    showLoader: true, // por defecto mostrar un loader en la UI
    showToast: true, // por defecto mostrar notificaciones tras la respuesta
    withCredentials: true, // enviar cookies (útil para cookies HTTP-only)
    headers: {
      'Content-Type': 'application/json', // header por defecto para APIs REST JSON
    },
  }

  // Construye la configuración de axios (solo campos que usamos desde RequestOptions)
  private buildAxiosConfig(options: RequestOptions): AxiosRequestConfig {
    const { withCredentials, headers } = options
    return { withCredentials, headers } // devuelve la config lista para pasar a axios
  }

  // Manejo centralizado de errores: aquí se puede normalizar, loguear o reportar errores
  private handleError(_error: AxiosError, _options: RequestOptions): void {
    console.log(_error, _options)
  }

  // Ejecuta la petición (requestFn) y devuelve response.data tipado; captura errores centralmente
  private async executeRequest<T>(requestFn: () => Promise<unknown>, options: RequestOptions): Promise<T> {
    try {
      const response = (await requestFn()) as { data: T } // asumimos que axios devuelve { data: T }
      return response?.data // devolvemos solo la carga útil (data) a los llamadores
    } catch (error) {
      this.handleError(error as AxiosError, options) // procesar el error de forma consistente
      throw error // re-lanzar el error para que la capa superior lo maneje también
    }
  }

  // Método GET tipado y con merge de opciones por defecto
  async get<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
    const config = { ...this.DEFAULT_OPTIONS, ...options } // combinar opciones por defecto y específicas
    return this.executeRequest<T>(() => apiClient.get(url, this.buildAxiosConfig(config)), config) // ejecutar GET
  }

  // Método POST tipado; envía body y aplica opciones
  async post<T = unknown>(url: string, body: unknown = {}, options: RequestOptions = {}): Promise<T> {
    const config = { ...this.DEFAULT_OPTIONS, ...options } // combinar opciones
    return this.executeRequest<T>(() => apiClient.post(url, body, this.buildAxiosConfig(config)), config) // ejecutar POST
  }

  // Método PUT tipado para actualizar recursos completos
  async put<T = unknown>(url: string, body: unknown = {}, options: RequestOptions = {}): Promise<T> {
    const config = { ...this.DEFAULT_OPTIONS, ...options } // combinar opciones
    return this.executeRequest<T>(() => apiClient.put(url, body, this.buildAxiosConfig(config)), config) // ejecutar PUT
  }

  // Método PATCH tipado para actualizaciones parciales
  async patch<T = unknown>(url: string, body: unknown = {}, options: RequestOptions = {}): Promise<T> {
    const config = { ...this.DEFAULT_OPTIONS, ...options } // combinar opciones
    return this.executeRequest<T>(() => apiClient.patch(url, body, this.buildAxiosConfig(config)), config) // ejecutar PATCH
  }

  // Método DELETE tipado para eliminar recursos
  async delete<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
    const config = { ...this.DEFAULT_OPTIONS, ...options } // combinar opciones
    return this.executeRequest<T>(() => apiClient.delete(url, this.buildAxiosConfig(config)), config) // ejecutar DELETE
  }
}

// Exportamos una instancia única del servicio para usar en toda la aplicación
export const requestService = new RequestService()