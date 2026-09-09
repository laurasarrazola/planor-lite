/* Este archivo define tres interfaces que modelan las opciones y las formas de respuesta/error usadas por las llamadas HTTP de la aplicación */

// La interfaz `RequestOptions` Permite pasar metadatos sobre cómo debe comportarse la petición en la capa de UI o en un wrapper HTTP (p. ej. mostrar un loader o un toast).
export interface RequestOptions {
  //indicador para mostrar/ocultar un spinner mientras dura la petición.
  showLoader?: boolean
  //indicador para mostrar notificaciones tras la respuesta.
  showToast?: boolean
  // cabeceras HTTP adicionales a incluir en la petición.
  headers?: Record<string, string>
  //si la petición debe incluir credenciales/cookies
  withCredentials?: boolean
}

// La interfaz `ErrorResponse` modela la estructura de las respuestas de error de la API.
export interface ErrorResponse {
    statusCode?: number;
    message?: string | string[];
    error?: string;
    errorId?: string;
  [key: string]: unknown
}

// La interfaz `SuccessResponse` modela la estructura de las respuestas exitosas de la API.
export interface SuccessResponse<T = unknown> {
  data?: T
  msg?: string
  [key: string]: unknown
}
