/**
 * Storage Keys
 * Constants for sessionStorage/localStorage keys
 * Note: Tokens are managed via HTTP-only cookies
 */

export const STORAGE_KEYS = {
  // Auth (tokens managed via HTTP-only cookies)
  IS_AUTH: 'isAuth',
  USER: 'user',
  MENU: 'menu',
  
  // Session
  SESSION_ID: 'session_id',
  LAST_ACTIVITY: 'last_activity',
  
  // UI State
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  SIDEBAR_OPEN: 'sidebar_open',
  
  // Temporary Data
  FORM_DRAFT: 'form_draft',
  SEARCH_HISTORY: 'search_history',
} as const

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]