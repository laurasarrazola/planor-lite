/**
 * Exportaciones del módulo de configuración principal
 * @module core/config
 */

//Reexporta la constante env (variables de entorno y valores por defecto).
export { env } from './env.config'
//Reexporta API_ENDPOINTS (rutas de la API organizadas por funcionalidad).
export { API_ENDPOINTS } from './api.config'
//Reexporta la instancia queryClient de React Query (configuración global de queries).
export { queryClient } from './query.config'