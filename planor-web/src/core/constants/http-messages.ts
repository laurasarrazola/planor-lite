import { HttpStatus } from './http-status.enum'

export const httpMessages: Record<HttpStatus, string> = {
  // Success
  [HttpStatus.OK]: 'Operación exitosa',
  [HttpStatus.CREATED]: 'Recurso creado exitosamente',
  [HttpStatus.ACCEPTED]: 'Solicitud aceptada',
  [HttpStatus.NO_CONTENT]: 'Sin contenido',

  // Client Errors
  [HttpStatus.BAD_REQUEST]: 'Solicitud incorrecta',
  [HttpStatus.UNAUTHORIZED]: 'No autorizado. Por favor, inicia sesión',
  [HttpStatus.FORBIDDEN]: 'Acceso denegado',
  [HttpStatus.NOT_FOUND]: 'Recurso no encontrado',
  [HttpStatus.METHOD_NOT_ALLOWED]: 'Método no permitido',
  [HttpStatus.CONFLICT]: 'Conflicto con el estado actual',
  [HttpStatus.UNPROCESSABLE_ENTITY]: 'Datos inválidos',
  [HttpStatus.TOO_MANY_REQUESTS]: 'Demasiadas solicitudes. Intenta más tarde',

  // Server Errors
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'Error del servidor. Intenta más tarde',
  [HttpStatus.BAD_GATEWAY]: 'Error de conexión',
  [HttpStatus.SERVICE_UNAVAILABLE]: 'Servicio no disponible',
  [HttpStatus.GATEWAY_TIMEOUT]: 'Tiempo de espera agotado',
}