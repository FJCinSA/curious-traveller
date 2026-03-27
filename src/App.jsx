// Root application component.
// Handles hash-based routing between the home screen and individual trip chapters.
// Hash routing works offline without any server redirect configuration,
// and is compatible with the PWA service worker's precache strategy.
import { useState, useEffect } from 'react'
import Home from './components/Home'
import TripPage from './components/TripPage'
import InstallPrompt from './components/InstallPrompt'
import UpdateManager from './components/UpdateManager'
import { trips } from './data/trips'
import styles from './App.module.css'

// Reads the current URL hash and returns it as the screen name, defaulting to 'home'
function getHash() {
  return window.location.hash.slice(1) || 'home'
}

export default function App() {
  const [screen, setScreen] = useState(getHash)

  // Keep screen state in sync with the browser's back/forward navigation
  useEffect(() => {
    const handler = () => setScreen(getHash())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  // Scroll to top and update the URL hash — triggers the hashchange listener above
  const navigate = (dest) => {
    window.scrollTo(0, 0)
    window.location.hash = dest
  }

  const currentTrip = trips.find(t => t.id === screen)

  return (
    <div className={styles.app}>
      {screen === 'home' || !currentTrip ? (
        <Home trips={trips} onSelect={navigate} />
      ) : (
        // key={currentTrip.id} forces TripPage to fully unmount and remount when
        // the user navigates from one trip to another, resetting all local state
        <TripPage
          key={currentTrip.id}
          trip={currentTrip}
          onBack={() => navigate('home')}
        />
      )}
      <InstallPrompt />
      <UpdateManager />
    </div>
  )
}
