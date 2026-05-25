import { hashService } from './hash.service'

class StorageService {
  set<T>(key: string, value: T): void {
    try {
      sessionStorage.setItem(hashService.hashKey(key), hashService.hashValue(value))
    } catch (error) {
      console.error(`Error saving to sessionStorage [${key}]:`, error)
    }
  }

  get<T>(key: string): T | null {
    try {
      const hashed = sessionStorage.getItem(hashService.hashKey(key))
      if (hashed === null) return null
      return hashService.unhashValue(hashed) as T
    } catch (error) {
      console.error(`Error reading from sessionStorage [${key}]:`, error)
      return null
    }
  }

  remove(key: string): void {
    try {
      sessionStorage.removeItem(hashService.hashKey(key))
    } catch (error) {
      console.error(`Error removing from sessionStorage [${key}]:`, error)
    }
  }

  clear(): void {
    try {
      sessionStorage.clear()
    } catch (error) {
      console.error('Error clearing sessionStorage:', error)
    }
  }

  has(key: string): boolean {
    return sessionStorage.getItem(hashService.hashKey(key)) !== null
  }
}

export const storageService = new StorageService()