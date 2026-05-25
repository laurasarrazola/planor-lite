import type { AxiosError, AxiosRequestConfig } from 'axios'
import { apiClient } from '@/core/api'
import type { RequestOptions } from '@/core/api'

class RequestService {

  private readonly DEFAULT_OPTIONS: RequestOptions = {
    showLoader: true,
    showToast: true,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  private buildAxiosConfig(options: RequestOptions): AxiosRequestConfig {
    const { withCredentials, headers } = options
    return { withCredentials, headers }
  }

  private handleError(_error: AxiosError, _options: RequestOptions): void {
    console.log(_error, _options)
     }

  private async executeRequest<T>(requestFn: () => Promise<unknown>, options: RequestOptions): Promise<T> {
    try {
      const response = await requestFn() as {data:T}
      return response?.data
    } catch (error) {
      this.handleError(error as AxiosError, options)
      throw error
    }
  }

  async get<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
    const config = { ...this.DEFAULT_OPTIONS, ...options }
    return this.executeRequest<T>(() => apiClient.get(url, this.buildAxiosConfig(config)), config)
  }

  async post<T = unknown>(url: string, body: unknown = {}, options: RequestOptions = {}): Promise<T> {
    const config = { ...this.DEFAULT_OPTIONS, ...options }
    return this.executeRequest<T>(() => apiClient.post(url, body, this.buildAxiosConfig(config)), config)
  }

  async put<T = unknown>(url: string, body: unknown = {}, options: RequestOptions = {}): Promise<T> {
    const config = { ...this.DEFAULT_OPTIONS, ...options }
    return this.executeRequest<T>(() => apiClient.put(url, body, this.buildAxiosConfig(config)), config)
  }

  async patch<T = unknown>(url: string, body: unknown = {}, options: RequestOptions = {}): Promise<T> {
    const config = { ...this.DEFAULT_OPTIONS, ...options }
    return this.executeRequest<T>(() => apiClient.patch(url, body, this.buildAxiosConfig(config)), config)
  }

  async delete<T = unknown>(url: string, options: RequestOptions = {}): Promise<T> {
    const config = { ...this.DEFAULT_OPTIONS, ...options }
    return this.executeRequest<T>(() => apiClient.delete(url, this.buildAxiosConfig(config)), config)
  }
}

export const requestService = new RequestService()