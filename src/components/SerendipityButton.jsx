// Serendipity Button — fixed gold circle, bottom right.
// Tap it: one unexpected local suggestion surfaces from the companion.
// Cycles through the city's serendipity array randomly.
import { useState, useCallback } from 'react'
import styles from './SerendipityButton.module.css'

export default function SerendipityButton({ serendipity = [] }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(() => Math.floor(Math.random() * Math.max(serendipity.length, 1)))

  const handleOpen = useCallback(() => {
    if (serendipity.length === 0) return
    // Pick a new random index different from current when possible
    if (serendipity.length > 1) {
      let next
      do { next = Math.floor(Math.random() * serendipity.length) } while (next === index)
      setIndex(next)
    }
    setOpen(true)
  }, [serendipity, index])

  const handleClose = () => setOpen(false)

  if (serendipity.length === 0) return null

  return (
    <>
      <button
        className={styles.btn}
        onClick={handleOpen}
        aria-label="Serendipity — an unexpected suggestion"
        title="Something unexpected"
      >
        <svg className={styles.rose} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <path d="M12 2 L12 7 M12 17 L12 22 M2 12 L7 12 M17 12 L22 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M4.93 4.93 L8.46 8.46 M15.54 15.54 L19.07 19.07 M19.07 4.93 L15.54 8.46 M8.46 15.54 L4.93 19.07" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div className={styles.overlay} onClick={handleClose}>
          <div className={styles.card} onClick={e => e.stopPropagation()}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>✦</span>
              <span className={styles.cardLabel}>Serendipity</span>
            </div>
            <p className={styles.cardText}>{serendipity[index] || ''}</p>
            <button className={styles.cardClose} onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
