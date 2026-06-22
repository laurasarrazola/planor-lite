// Servicio que delega en storageService para manejar datos de autenticación en el cliente
import { storageService } from "./storage.service"
import { STORAGE_KEYS } from '@/core/constants'

// Modelo simple de usuario usado por este servicio
export interface User {
  email: string
  name: string
}

class AuthStorageService {
  // Guarda el flag de autenticación (true/false)
  setIsAuth(isAuth: boolean): void {
    storageService.set(STORAGE_KEYS.IS_AUTH, isAuth)
  }

  // Recupera el flag de autenticación, devuelve false si no existe
  getIsAuth(): boolean {
    return storageService.get<boolean>(STORAGE_KEYS.IS_AUTH) ?? false
  }

  // Guarda el objeto usuario en storage
  setUser(user: User): void {
    storageService.set(STORAGE_KEYS.USER, user)
  }

  // Recupera el usuario desde storage o null si no existe
  getUser(): User | null {
    return storageService.get<User>(STORAGE_KEYS.USER)
  }

  // Guarda la estructura del menú (puede ser cualquier tipo)
  setMenu(menu: unknown): void {
    storageService.set(STORAGE_KEYS.MENU, menu)
  }

  // Recupera el menú o null si no existe
  getMenu(): unknown | null {
    return storageService.get(STORAGE_KEYS.MENU)
  }

  // Alias semántico para comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getIsAuth()
  }

  // Borra todos los datos de autenticación (logout local)
  clearAuth(): void {
    storageService.remove(STORAGE_KEYS.IS_AUTH)
    storageService.remove(STORAGE_KEYS.USER)
    storageService.remove(STORAGE_KEYS.MENU)
  }

  // Helper para establecer toda la sesión en una sola llamada
  setSession(isAuth: boolean, user: User, menu: unknown): void {
    this.setIsAuth(isAuth)
    this.setUser(user)
    this.setMenu(menu)
  }

  // Devuelve el estado completo de la sesión (isAuth, user, menu)
  getSession(): { isAuth: boolean; user: User | null; menu: unknown | null } {
    return {
      isAuth: this.getIsAuth(),
      user: this.getUser(),
      menu: this.getMenu(),
    }
  }
}

// Exportamos una instancia única para usar en toda la aplicación
export const authStorageService = new AuthStorageService()