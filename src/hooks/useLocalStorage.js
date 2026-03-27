// Safe localStorage hook with try/catch throughout.
// Falls back to in-memory state if localStorage is unavailable
// (private browsing mode, storage quota exceeded, etc.).
import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  // Initialise from localStorage on first render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  // Write to both state and localStorage — silently falls back to state-only on error
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch {
      setStoredValue(value instanceof Function ? value(storedValue) : value)
    }
  }

  return [storedValue, setValue]
}
