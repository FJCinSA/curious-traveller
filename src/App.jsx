import { useState, useEffect } from 'react'
import Home from './components/Home'
import TripPage from './components/TripPage'
import InstallPrompt from './components/InstallPrompt'
import { trips } from './data/trips'
import styles from './App.module.css'

function getHash() {
  return window.location.hash.slice(1) || 'home'
}

export default function App() {
  const [screen, setScreen] = useState(getHash)

  useEffect(() => {
    const handler = () => setScreen(getHash())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

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
        <TripPage
          key={currentTrip.id}
          trip={currentTrip}
          onBack={() => navigate('home')}
        />
      )}
      <InstallPrompt />
    </div>
  )
}
