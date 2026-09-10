// En este archivo se definen las claves de almacenamiento utilizadas en la aplicación para guardar datos en el almacenamiento local o de sesión del navegador. Estas claves se utilizan para acceder y manipular datos relacionados con la autenticación, la sesión del usuario, el estado de la interfaz de usuario y datos temporales.
export const STORAGE_KEYS = {
  // Auth
  IS_AUTH: 'isAuth',
  USER: 'user',
  TOKEN: 'token',
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