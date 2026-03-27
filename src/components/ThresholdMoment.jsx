// Threshold Moment — full-screen overlay shown once on the first app open
// of each city transition day. Fades in, shows 8 seconds, dismisses on tap.
// Shown once per date — stored in localStorage.
import { useState, useEffect } from 'react'
import { thresholdMoments } from '../data/itinerary'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { todayISO } from '../utils/dates'
import styles from './ThresholdMoment.module.css'

export default function ThresholdMoment() {
  const today = todayISO()
  const moment = thresholdMoments[today]
  const [seen, setSeen] = useLocalStorage(`ct_threshold_${today}`, false)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!moment || seen || dismissed) return
    // Fade in after a brief delay
    const t = setTimeout(() => setVisible(true), 150)
    return () => clearTimeout(t)
  }, [moment, seen, dismissed])

  useEffect(() => {
    if (!visible) return
    // Auto-dismiss after 8 seconds
    const t = setTimeout(() => dismiss(), 8000)
    return () => clearTimeout(t)
  }, [visible])

  const dismiss = () => {
    setSeen(true)
    setDismissed(true)
  }

  if (!moment || seen || dismissed) return null

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.visible : ''}`}
      onClick={dismiss}
      role="dialog"
      aria-label={`Threshold moment: ${moment.title}`}
    >
      <div className={styles.inner}>
        <p className={styles.title}>{moment.title}</p>
        <div className={styles.divider} />
        <div className={styles.lines}>
          {moment.lines.map((line, i) =>
            line === '' ? (
              <br key={i} />
            ) : (
              <p key={i} className={styles.line}>{line}</p>
            )
          )}
        </div>
        <p className={styles.tap}>Tap to continue</p>
      </div>
    </div>
  )
}
