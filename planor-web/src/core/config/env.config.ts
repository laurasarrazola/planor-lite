/**
 * Environment configuration object
 * Contains all environment variables used throughout the application
 * @constant {Object} env - Application environment configuration
 * @property {string} API_URL - Base URL for API requests
 * @property {number} API_TIMEOUT - Request timeout in milliseconds
 * @property {string} type - Application environment type
 */
export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  type: import.meta.env.TYPE,
 } as const