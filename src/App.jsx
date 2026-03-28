// Root application component.
// Handles hash-based routing between the home screen and individual trip chapters.
// Hash routing works offline without any server redirect configuration,
// and is compatible with the PWA service worker's precache strategy.
import { useState, useEffect } from 'react'
import Home from './components/Home'
import TripPage from './components/TripPage'
import Checklist from './components/Checklist'
import MemoryJarView from './components/MemoryJarView'
import TheLetter from './components/TheLetter'
import JourneyPage from './components/JourneyPage'
import ThresholdMoment from './components/ThresholdMoment'
import InstallPrompt from './components/InstallPrompt'
import UpdateManager from './components/UpdateManager'
import ErrorBoundary from './components/ErrorBoundary'
import { SlowTravelProvider } from './context/SlowTravelContext'
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

  function renderScreen() {
    if (screen === 'checklist') {
      return <Checklist onClose={() => navigate('home')} />
    }
    if (screen === 'memoryjar') {
      return <MemoryJarView onClose={() => navigate('home')} />
    }
    if (screen === 'letter') {
      return <TheLetter onClose={() => navigate('memoryjar')} />
    }
    if (screen === 'journey') {
      return <JourneyPage onClose={() => navigate('home')} />
    }
    if (screen === 'home' || !currentTrip) {
      return (
        <Home
          trips={trips}
          onSelect={navigate}
          onOpenChecklist={() => navigate('checklist')}
          onOpenMemoryJar={() => navigate('memoryjar')}
          onOpenJourney={() => navigate('journey')}
        />
      )
    }
    // key={currentTrip.id} forces TripPage to fully unmount and remount when
    // the user navigates from one trip to another, resetting all local state
    return (
      <TripPage
        key={currentTrip.id}
        trip={currentTrip}
        onBack={() => navigate('home')}
      />
    )
  }

  return (
    <SlowTravelProvider>
      <div className={styles.app}>
        <ErrorBoundary>
          {renderScreen()}
        </ErrorBoundary>
        {/* ThresholdMoment — full-screen overlay on city transition days */}
        <ThresholdMoment />
        <InstallPrompt />
        <UpdateManager />
      </div>
    </SlowTravelProvider>
  )
}
