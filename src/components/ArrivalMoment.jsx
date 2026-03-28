// ArrivalMoment — first app open in a new city, city name fades in large.
// Shown once per destination, never again (localStorage gated per city).
// Auto-dismisses after 5s; tap/click dismisses immediately.
// Only fires for actual arrival cities, not departure/home.
import { useState, useEffect } from 'react'
import { JOURNEY_STOPS } from '../data/journey'
import { todayISO } from '../utils/dates'
import styles from './ArrivalMoment.module.css'

const ARRIVAL_CITIES = new Set(['singapore', 'busan', 'gyeongju', 'seoul'])

function getCurrentStop() {
  const today = todayISO()
  return JOURNEY_STOPS.find(s =>
    ARRIVAL_CITIES.has(s.id) &&
    today >= s.dateRange.start &&
    today <= s.dateRange.end
  ) || null
}

export default function ArrivalMoment() {
  const stop = getCurrentStop()
  const key  = stop ? `ct_arrival_${stop.id}` : null

  const [visible, setVisible] = useState(() => {
    if (!stop || !key) return false
    try { return !localStorage.getItem(key) } catch { return false }
  })

  useEffect(() => {
    if (!visible || !key) return
    // Mark as shown immediately so refresh or re-open never shows it again
    try { localStorage.setItem(key, '1') } catch {}
    const t = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(t)
  }, [visible, key])

  if (!visible || !stop) return null

  return (
    <div
      className={styles.overlay}
      onClick={() => setVisible(false)}
      aria-label={`Arriving in ${stop.city}`}
    >
      <div className={styles.content}>
        <p className={styles.arriving}>Arriving in</p>
        <h2 className={styles.city}>{stop.city}</h2>
        <p className={styles.flag}>{stop.flag}</p>
        <p className={styles.tap}>Tap to continue</p>
      </div>
    </div>
  )
}
