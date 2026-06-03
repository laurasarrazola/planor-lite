// Archivo que define un objeto con mensajes de texto asociados a cada código de estado HTTP, utilizando el enum HttpStatus para las claves. Estos mensajes pueden ser utilizados en la aplicación para proporcionar retroalimentación al usuario sobre el resultado de las operaciones HTTP.
import { HttpStatus } from './http-status.enum'

export const httpMessages: Record<HttpStatus, string> = {
  // Éxito
  [HttpStatus.OK]: 'Operación exitosa',
  [HttpStatus.CREATED]: 'Recurso creado exitosamente',
  [HttpStatus.ACCEPTED]: 'Solicitud aceptada',
  [HttpStatus.NO_CONTENT]: 'Sin contenido',

  // errores del cliente
  [HttpStatus.BAD_REQUEST]: 'Solicitud incorrecta',
  [HttpStatus.UNAUTHORIZED]: 'No autorizado. Por favor, inicia sesión',
  [HttpStatus.FORBIDDEN]: 'Acceso denegado',
  [HttpStatus.NOT_FOUND]: 'Recurso no encontrado',
  [HttpStatus.METHOD_NOT_ALLOWED]: 'Método no permitido',
  [HttpStatus.CONFLICT]: 'Conflicto con el estado actual',
  [HttpStatus.UNPROCESSABLE_ENTITY]: 'Datos inválidos',
  [HttpStatus.TOO_MANY_REQUESTS]: 'Demasiadas solicitudes. Intenta más tarde',

  // errores del servidor
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'Error del servidor. Intenta más tarde',
  [HttpStatus.BAD_GATEWAY]: 'Error de conexión',
  [HttpStatus.SERVICE_UNAVAILABLE]: 'Servicio no disponible',
  [HttpStatus.GATEWAY_TIMEOUT]: 'Tiempo de espera agotado',
}