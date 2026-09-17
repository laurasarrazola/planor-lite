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
    UPDATE_PROFILE: '/usuarios/me',
    DELETE_ACCOUNT: '/usuarios/eliminar',
  },

  BOARDS: {
    MY_BOARDS: '/tableros/usuario',
    CREATE: '/tableros',
    BY_ID: (idTablero: number) => `/tableros/${idTablero}`,
  },

  STATES: {
    BY_BOARD: (idTablero: number) => `/estados/${idTablero}`,
},

  TASKS: {
    CREATE: (idTablero: number) => `/tareas/${idTablero}`,
    BY_BOARD: (idTablero: number) => `/tareas/tablero/${idTablero}`,
    BY_ID: (idTarea: number) => `/tareas/${idTarea}`,
    MOVE: (idTarea: number) => `/tareas/${idTarea}/mover`,
  },
} as const;
