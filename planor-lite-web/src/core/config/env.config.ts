/**
 * Objeto de configuración del entorno
 * Contiene todas las variables de entorno usadas en la aplicación
 * @constant {Object} env - Configuración de entorno de la aplicación
 * @property {string} API_URL - URL base para las peticiones a la API
 * @property {number} API_TIMEOUT - Tiempo de espera de las peticiones en milisegundos
 * @property {string} type - Tipo de entorno de la aplicación
 */

// Se exporta el objeto de configuración del entorno para ser utilizado en toda la aplicación
export const env = {
  //obtiene el valor de la variable de entorno definida en el archivo .env.
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  //obtiene el valor de la variable de entorno definida en el archivo .env.
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  //obtiene el valor de la variable de entorno definida en el archivo .env.
  type: import.meta.env.TYPE,
 } as const