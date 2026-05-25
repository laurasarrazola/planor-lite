export interface RequestOptions {
  showLoader?: boolean
  showToast?: boolean
  headers?: Record<string, string>
  withCredentials?: boolean
}

export interface ErrorResponse {
  msg?: string
  errorId?: string
  [key: string]: unknown
}

export interface SuccessResponse<T = unknown> {
  data?: T
  msg?: string
  [key: string]: unknown
}
