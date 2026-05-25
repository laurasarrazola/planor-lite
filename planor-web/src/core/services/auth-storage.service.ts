import { storageService } from "./storage.service"
import { STORAGE_KEYS } from '@/core/constants'

export interface User {
  email: string
  name: string
}

class AuthStorageService {
  setIsAuth(isAuth: boolean): void {
    storageService.set(STORAGE_KEYS.IS_AUTH, isAuth)
  }

  getIsAuth(): boolean {
    return storageService.get<boolean>(STORAGE_KEYS.IS_AUTH) ?? false
  }

  setUser(user: User): void {
    storageService.set(STORAGE_KEYS.USER, user)
  }

  getUser(): User | null {
    return storageService.get<User>(STORAGE_KEYS.USER)
  }

  setMenu(menu: unknown): void {
    storageService.set(STORAGE_KEYS.MENU, menu)
  }

  getMenu(): unknown | null {
    return storageService.get(STORAGE_KEYS.MENU)
  }

  isAuthenticated(): boolean {
    return this.getIsAuth()
  }

  clearAuth(): void {
    storageService.remove(STORAGE_KEYS.IS_AUTH)
    storageService.remove(STORAGE_KEYS.USER)
    storageService.remove(STORAGE_KEYS.MENU)
  }

  setSession(isAuth: boolean, user: User, menu: unknown): void {
    this.setIsAuth(isAuth)
    this.setUser(user)
    this.setMenu(menu)
  }

  getSession(): { isAuth: boolean; user: User | null; menu: unknown | null } {
    return {
      isAuth: this.getIsAuth(),
      user: this.getUser(),
      menu: this.getMenu(),
    }
  }
}

export const authStorageService = new AuthStorageService()
