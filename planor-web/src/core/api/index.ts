// Barrel de core/api: reexporta la instancia HTTP (apiClient) y los tipos relacionados (RequestOptions, ErrorResponse, SuccessResponse) para importar desde un único punto. Mantén este archivo sin lógica.
export { apiClient } from './axios.config'
export type { RequestOptions, ErrorResponse, SuccessResponse } from './request.types'