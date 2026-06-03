// Servicio que encapsula el acceso a sessionStorage y aplica ofuscación usando hashService
import { hashService } from './hash.service'

// Clase que ofrece métodos tipados para set/get/remove/clear/has en sessionStorage
class StorageService {
  // Guarda un valor tipado T bajo la clave proporcionada (serializa y ofusca)
  set<T>(key: string, value: T): void {
    try {
      // Guardamos en sessionStorage usando clave y valor ofuscados para no dejar texto plano
      sessionStorage.setItem(hashService.hashKey(key), hashService.hashValue(value))
    } catch (error) {
      // Si ocurre un error (quota, bloqueo, etc.) lo logueamos para depuración
      console.error(`Error saving to sessionStorage [${key}]:`, error)
    }
  }

  // Recupera un valor tipado T desde sessionStorage o devuelve null si no existe o hay error
  get<T>(key: string): T | null {
    try {
      // Leemos el valor ofuscado por la clave ofuscada
      const hashed = sessionStorage.getItem(hashService.hashKey(key))
      // Si no existe la clave, devolvemos null como indicador de ausencia
      if (hashed === null) return null
      // Decodificamos y parseamos el valor y lo retornamos con el tipo solicitado
      return hashService.unhashValue(hashed) as T
    } catch (error) {
      // Si hay error al leer/parsear (datos corruptos, JSON inválido), lo registramos y devolvemos null
      console.error(`Error reading from sessionStorage [${key}]:`, error)
      return null
    }
  }

  // Elimina la entrada correspondiente a la clave dada (usa clave ofuscada)
  remove(key: string): void {
    try {
      // RemoveItem con la clave ofuscada para mantener coherencia con set/get
      sessionStorage.removeItem(hashService.hashKey(key))
    } catch (error) {
      // Log en caso de fallos al intentar eliminar (p. ej. ambiente restringido)
      console.error(`Error removing from sessionStorage [${key}]:`, error)
    }
  }

  // Limpia completamente sessionStorage (ATENCIÓN: borra todo en la pestaña)
  clear(): void {
    try {
      // Llamada directa a clear; usar con precaución si hay datos de otras apps
      sessionStorage.clear()
    } catch (error) {
      // Registrar si clear falla por alguna razón del entorno
      console.error('Error clearing sessionStorage:', error)
    }
  }

  // Comprueba si existe una clave concreta en sessionStorage (true/false)
  has(key: string): boolean {
    // Retorna true si getItem con la clave ofuscada no es null
    return sessionStorage.getItem(hashService.hashKey(key)) !== null
  }
}

// Exportamos una instancia única para usar el mismo servicio en toda la aplicación
export const storageService = new StorageService()