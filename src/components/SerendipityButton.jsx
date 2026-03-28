// Serendipity Button — fixed gold compass, bottom right.
// Tracks every shown suggestion per city in localStorage.
// Never repeats. When all suggestions exhausted, acknowledges honestly.
// theme/cityId: 'singapore' | 'busan' | 'jinhae' | 'gyeongju' | 'seoul' | ''
import { useState } from 'react'
import styles from './SerendipityButton.module.css'

const THEME_WASH = {
  singapore: styles.washTeal,
  busan:     styles.washPink,
  jinhae:    styles.washPink,
  gyeongju:  styles.washPink,
  seoul:     styles.washAmber,
}

function getShown(cityId) {
  try {
    const raw = localStorage.getItem(`serendipity_shown_${cityId}`)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function markShown(cityId, idx) {
  try {
    const shown = getShown(cityId)
    if (!shown.includes(idx)) {
      localStorage.setItem(
        `serendipity_shown_${cityId}`,
        JSON.stringify([...shown, idx])
      )
    }
  } catch {}
}

function pickUnshown(total, cityId) {
  const shown    = getShown(cityId)
  const available = Array.from({ length: total }, (_, i) => i)
    .filter(i => !shown.includes(i))
  if (available.length === 0) return null
  return available[Math.floor(Math.random() * available.length)]
}

export default function SerendipityButton({ serendipity = [], theme = '' }) {
  const [open,      setOpen]      = useState(false)
  const [index,     setIndex]     = useState(null)
  const [exhausted, setExhausted] = useState(false)

  const cityId    = theme
  const washClass = THEME_WASH[cityId] || ''

  function pick() {
    const next = pickUnshown(serendipity.length, cityId)
    if (next === null) {
      setExhausted(true)
    } else {
      markShown(cityId, next)
      setIndex(next)
      setExhausted(false)
    }
  }

  const handleOpen = () => {
    if (serendipity.length === 0) return
    if (getShown(cityId).length >= serendipity.length) {
      setExhausted(true)
    } else {
      pick()
    }
    setOpen(true)
  }

  const handleSurprise = () => pick()
  const handleClose    = () => setOpen(false)

  if (serendipity.length === 0) return null

  // Fresh check each render — getShown reads from localStorage
  const hasMore = !exhausted && getShown(cityId).length < serendipity.length

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

            {exhausted ? (
              <>
                <p className={`${styles.cardText} ${styles.exhaustedText}`}>
                  You have found everything we know about this city's hidden corners.
                  The rest you will discover yourself.
                  That is the best kind of serendipity.
                </p>
                <div className={styles.cardFooter}>
                  <button className={styles.cardClose} onClick={handleClose}>Close</button>
                </div>
              </>
            ) : (
              <>
                <p className={styles.cardText}>
                  {index !== null ? serendipity[index] : ''}
                </p>
                <div className={styles.cardFooter}>
                  {hasMore && (
                    <button className={styles.surpriseBtn} onClick={handleSurprise}>
                      Surprise me again
                    </button>
                  )}
                  <button className={styles.cardClose} onClick={handleClose}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
