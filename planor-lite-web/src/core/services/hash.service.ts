// Servicio simple para codificar/decodificar y "ofuscar" claves/valores usando base64
class HashService {
  // Codifica una cadena en base64 de forma segura para Unicode
  encode(value: string): string {
    try {
      // Primero escapamos caracteres Unicode y luego aplicamos base64
      return btoa(encodeURIComponent(value))
    } catch (error) {
      // Si falla la codificación, registramos el error y devolvemos el valor original como fallback
      console.error('Error encoding value:', error)
      return value
    }
  }

  // Decodifica una cadena previamente codificada con encode()
  decode(value: string): string {
    try {
      // Invertimos el proceso: base64 -> decodeURIComponent
      return decodeURIComponent(atob(value))
    } catch (error) {
      // Si falla la decodificación, registramos el error y devolvemos el valor original como fallback
      console.error('Error decoding value:', error)
      return value
    }
  }

  // Ofusca una clave (útil para storage keys u otros identificadores legibles)
  hashKey(key: string): string {
    return this.encode(key) // delega en encode para mantener lógica consistente
  }

  // Recupera la clave original a partir de su versión ofuscada
  unhashKey(hashedKey: string): string {
    return this.decode(hashedKey) // delega en decode para mantener lógica consistente
  }

  // Ofusca un valor (serializa objetos a JSON antes de codificar)
  hashValue(value: unknown): string {
    return this.encode(JSON.stringify(value)) // serializa y codifica para almacenar objetos
  }

  // Recupera el valor original desde la cadena ofuscada; devuelve null si falla el parseo
  unhashValue(hashedValue: string): unknown {
    try {
      // Decodifica y parsea JSON para reconstruir el valor original
      return JSON.parse(this.decode(hashedValue))
    } catch (error) {
      // Si algo falla (p. ej. no es JSON válido), logueamos y devolvemos null como señal de error
      console.error('Error unhashing value:', error)
      return null
    }
  }
}

// Exportamos una instancia única para ser usada en toda la aplicación
export const hashService = new HashService()