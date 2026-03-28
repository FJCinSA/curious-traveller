// SlowTravelToggle — floating pill, bottom left.
// Always visible on every screen — one tap switches slow travel mode.
// Counterpart to the Serendipity compass (bottom right).
// On the very first toggle ever: tortoise walks across the screen. Never again.
import { useState, useEffect, useRef } from 'react'
import { useSlowTravel } from '../context/SlowTravelContext'
import styles from './SlowTravelToggle.module.css'

export default function SlowTravelToggle() {
  const { slowTravel, setSlowTravel } = useSlowTravel()
  const prevRef = useRef(slowTravel)
  const [showTortoise, setShowTortoise] = useState(false)

  useEffect(() => {
    if (slowTravel && !prevRef.current) {
      try {
        if (!localStorage.getItem('ct_tortoise_shown')) {
          localStorage.setItem('ct_tortoise_shown', '1')
          setShowTortoise(true)
          const t = setTimeout(() => setShowTortoise(false), 3200)
          prevRef.current = slowTravel
          return () => clearTimeout(t)
        }
      } catch { /* storage unavailable */ }
    }
    prevRef.current = slowTravel
  }, [slowTravel])

  return (
    <>
      {showTortoise && (
        <span className={styles.tortoise} aria-hidden="true">🐢</span>
      )}
      <button
        className={`${styles.btn} ${slowTravel ? styles.active : ''}`}
        onClick={() => setSlowTravel(v => !v)}
        aria-label={slowTravel ? 'Slow Travel Mode on — tap to turn off' : 'Slow Travel Mode off — tap to turn on'}
        aria-pressed={slowTravel}
      >
        🐢
      </button>
    </>
  )
}
