/**
 * Centralized API endpoints configuration
 * Contains all API endpoint paths organized by feature
 * @constant {Object} API_ENDPOINTS - API endpoint definitions
 */
export const API_ENDPOINTS = {
  /**
   * Authentication endpoints
   */
  AUTH: {
    LOGIN: 'api/accounts/web-login/',
    REGISTER: 'api/accounts/register/',
    LOGOUT: 'api/accounts/logout/',
    PROFILE: 'api/accounts/profile/',
  },
} as const