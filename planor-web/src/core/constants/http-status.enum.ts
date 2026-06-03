//objeto con claves en mayúsculas y valores numéricos representando los códigos de estado HTTP
export const HttpStatus = {
  // Éxito
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Errores del cliente
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // Errores del servidor
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const
//tipo que representa los valores de los códigos de estado HTTP definidos en el objeto HttpStatus
export type HttpStatus = typeof HttpStatus[keyof typeof HttpStatus]