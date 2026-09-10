/**
 * Configuración centralizada de endpoints de la API
 * Contiene las rutas de los endpoints organizadas por funcionalidad
 * @constant {Object} API_ENDPOINTS - Definición de los endpoints de la API
 */

// Exportamos la constante API_ENDPOINTS para su uso en toda la aplicación
export const API_ENDPOINTS = {
  // Endpoints relacionados con la autenticación y gestión de cuentas
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },

  USERS: {
    REGISTER: '/usuarios',
    PROFILE: '/usuarios/perfil',
  },

  BOARDS: {
     MY_BOARDS: '/tableros/usuario',
  },

  TASKS: {
    // posteriormente
  },
} as const;
