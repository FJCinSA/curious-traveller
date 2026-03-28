// Serendipity Button — fixed gold compass, bottom right.
// Tap: suggestion slides up immediately in a beautiful card.
// Card background has a city-appropriate colour wash.
// "Surprise me again" cycles to a new suggestion without closing.
// theme prop: 'singapore' | 'busan' | 'jinhae' | 'gyeongju' | 'seoul' | ''
import { useState, useCallback } from 'react'
import styles from './SerendipityButton.module.css'

const THEME_WASH = {
  singapore: styles.washTeal,
  busan:     styles.washPink,
  jinhae:    styles.washPink,
  gyeongju:  styles.washPink,
  seoul:     styles.washAmber,
}

export default function SerendipityButton({ serendipity = [], theme = '' }) {
  const [open,  setOpen]  = useState(false)
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * Math.max(serendipity.length, 1))
  )

  const pickNext = useCallback((current) => {
    if (serendipity.length <= 1) return current
    let next
    do { next = Math.floor(Math.random() * serendipity.length) } while (next === current)
    return next
  }, [serendipity])

  const handleOpen = useCallback(() => {
    if (serendipity.length === 0) return
    setIndex(prev => pickNext(prev))
    setOpen(true)
  }, [serendipity, pickNext])

  const handleSurprise = useCallback(() => {
    setIndex(prev => pickNext(prev))
  }, [pickNext])

  const handleClose = () => setOpen(false)

  if (serendipity.length === 0) return null

  const washClass = THEME_WASH[theme] || ''

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
          <path d="M12 2 L12 7 M12 17 L12 22 M2 12 L7 12 M17 12 L22 12"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M4.93 4.93 L8.46 8.46 M15.54 15.54 L19.07 19.07 M19.07 4.93 L15.54 8.46 M8.46 15.54 L4.93 19.07"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>

      {open && (
        <div className={styles.overlay} onClick={handleClose}>
          <div
            className={`${styles.card} ${washClass}`}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>✦</span>
              <span className={styles.cardLabel}>Serendipity</span>
            </div>
            <p className={styles.cardText}>{serendipity[index] || ''}</p>
            <div className={styles.cardFooter}>
              {serendipity.length > 1 && (
                <button className={styles.surpriseBtn} onClick={handleSurprise}>
                  Surprise me again
                </button>
              )}
              <button className={styles.cardClose} onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
