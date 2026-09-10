// Servicio que delega en storageService para manejar datos de autenticación en el cliente
import { storageService } from "./storage.service"
import { STORAGE_KEYS } from '@/core/constants'

export interface User {
  email: string
  name: string
}

export interface AuthSession {
  token: string
  email: string
  idUsuario: number
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

  // Guarda el token JWT de la sesión actual
  setToken(token: string): void {
    storageService.set(STORAGE_KEYS.TOKEN, token)
  }

  // Recupera el token JWT de la sesión actual
  getToken(): string | null {
    return storageService.get<string>(STORAGE_KEYS.TOKEN)
  }

  // Guarda la estructura del menú
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

  // Borra todos los datos de autenticación
  clearAuth(): void {
    storageService.remove(STORAGE_KEYS.IS_AUTH)
    storageService.remove(STORAGE_KEYS.TOKEN)
    storageService.remove(STORAGE_KEYS.USER)
    storageService.remove(STORAGE_KEYS.MENU)
  }

  // Guarda el token y marca la sesión como autenticada
  setSession(token: string, isAuth: boolean): void {
    this.setToken(token)
    this.setIsAuth(isAuth)
  }

  // Devuelve el estado completo de la sesión
  getSession(): {
    isAuth: boolean
    token: string | null
    user: User | null
    menu: unknown | null
  } {
    return {
      isAuth: this.getIsAuth(),
      token: this.getToken(),
      user: this.getUser(),
      menu: this.getMenu(),
    }
  }
}

// Exportamos una instancia única para usar en toda la aplicación
export const authStorageService = new AuthStorageService()