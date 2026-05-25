class HashService {
  encode(value: string): string {
    try {
      return btoa(encodeURIComponent(value))
    } catch (error) {
      console.error('Error encoding value:', error)
      return value
    }
  }

  decode(value: string): string {
    try {
      return decodeURIComponent(atob(value))
    } catch (error) {
      console.error('Error decoding value:', error)
      return value
    }
  }

  hashKey(key: string): string {
    return this.encode(key)
  }

  unhashKey(hashedKey: string): string {
    return this.decode(hashedKey)
  }

  hashValue(value: unknown): string {
    return this.encode(JSON.stringify(value))
  }

  unhashValue(hashedValue: string): unknown {
    try {
      return JSON.parse(this.decode(hashedValue))
    } catch (error) {
      console.error('Error unhashing value:', error)
      return null
    }
  }
}

export const hashService = new HashService()