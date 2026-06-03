/**
 * Configuración centralizada de endpoints de la API
 * Contiene las rutas de los endpoints organizadas por funcionalidad
 * @constant {Object} API_ENDPOINTS - Definición de los endpoints de la API
 */

// Exportamos la constante API_ENDPOINTS para su uso en toda la aplicación
export const API_ENDPOINTS = {
  // Endpoints relacionados con la autenticación y gestión de cuentas
  AUTH: {
    LOGIN: 'api/accounts/web-login/',
    REGISTER: 'api/accounts/register/',
    LOGOUT: 'api/accounts/logout/',
    PROFILE: 'api/accounts/profile/',
  },
} as const

