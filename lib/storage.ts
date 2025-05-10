/**
 * Utility functions for handling localStorage and sessionStorage operations with proper error handling
 */

// Type for storage keys
export type StorageKey = 'threadify-platform' | 'threadify-content' | 'threadify-media-items'

/**
 * Safely get an item from storage
 */
export function getStorageItem<T>(key: StorageKey, storage: Storage = localStorage): T | null {
  try {
    const item = storage.getItem(key)
    if (!item) return null
    return JSON.parse(item) as T
  } catch (error) {
    console.error(`Error getting item ${key} from storage:`, error)
    return null
  }
}

/**
 * Safely set an item in storage
 */
export function setStorageItem<T>(key: StorageKey, value: T, storage: Storage = localStorage): boolean {
  try {
    const serializedValue = JSON.stringify(value)
    storage.setItem(key, serializedValue)
    return true
  } catch (error) {
    console.error(`Error setting item ${key} in storage:`, error)
    return false
  }
}

/**
 * Safely remove an item from storage
 */
export function removeStorageItem(key: StorageKey, storage: Storage = localStorage): boolean {
  try {
    storage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing item ${key} from storage:`, error)
    return false
  }
}

/**
 * Check if storage is available
 */
export function isStorageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
  try {
    const storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Clear all threadify-related items from storage
 */
export function clearThreadifyStorage(storage: Storage = localStorage): boolean {
  try {
    Object.keys(storage).forEach(key => {
      if (key.startsWith('threadify-')) {
        storage.removeItem(key)
      }
    })
    return true
  } catch (error) {
    console.error('Error clearing threadify storage:', error)
    return false
  }
} 