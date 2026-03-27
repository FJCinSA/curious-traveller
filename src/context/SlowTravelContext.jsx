// Global context for Slow Travel mode.
// When enabled, LocationCard shows slowNote instead of the wow fact.
// State persists in localStorage so it survives page refresh and navigation.
import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const SlowTravelContext = createContext({ slowTravel: false, setSlowTravel: () => {} })

export function SlowTravelProvider({ children }) {
  const [slowTravel, setSlowTravel] = useLocalStorage('ct_slow_travel', false)
  return (
    <SlowTravelContext.Provider value={{ slowTravel, setSlowTravel }}>
      {children}
    </SlowTravelContext.Provider>
  )
}

export function useSlowTravel() {
  return useContext(SlowTravelContext)
}
