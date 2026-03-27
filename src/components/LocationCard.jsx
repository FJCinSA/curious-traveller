// A single location card — the core content unit of every trip chapter.
// Shows neighbourhood, name, and a one-sentence wow fact at all times.
// Two expandable panels are available:
//   "Tell me more" — history, suggested activities, and practical info
//   "What's nearby" — other locations on the same day, from the siblings prop
// Only one panel can be open at a time.
import { useState } from 'react'
import styles from './LocationCard.module.css'

export default function LocationCard({ location, siblings = [] }) {
  const [showMore, setShowMore] = useState(false)
  const [showNearby, setShowNearby] = useState(false)

  // Toggle "Tell me more" — closes "What's nearby" if it was open
  const toggleMore = () => {
    setShowMore(v => !v)
    if (!showMore) setShowNearby(false)
  }

  // Toggle "What's nearby" — closes "Tell me more" if it was open
  const toggleNearby = () => {
    setShowNearby(v => !v)
    if (!showNearby) setShowMore(false)
  }

  return (
    <article className={styles.card} style={{ '--accent': location.accent }}>

      <header className={styles.header}>
        <p className={styles.neighbourhood}>{location.neighbourhood}</p>
        <h3 className={styles.name}>{location.name}</h3>
      </header>

      {/* The one-sentence wow fact — always visible, never hidden */}
      <p className={styles.wow}>{location.wow}</p>

      <div className={styles.actions}>
        <button
          className={`${styles.action} ${showMore ? styles.open : ''}`}
          onClick={toggleMore}
          aria-expanded={showMore}
        >
          {showMore ? 'Close' : 'Tell me more'}
        </button>

        {/* "What's nearby" only shown when there are sibling locations on the same day */}
        {siblings.length > 0 && (
          <>
            <span className={styles.actionSep} />
            <button
              className={`${styles.action} ${showNearby ? styles.open : ''}`}
              onClick={toggleNearby}
              aria-expanded={showNearby}
            >
              {showNearby ? 'Close' : "What's nearby"}
            </button>
          </>
        )}
      </div>

      {/* Expanded panel: history, what to do, practical notes */}
      {showMore && (
        <div className={styles.panel}>
          <p className={styles.history}>{location.history}</p>
          {location.do && location.do.length > 0 && (
            <div className={styles.suggestions}>
              {/* Index key is safe here — this is static data that never reorders */}
              {location.do.map((item, i) => (
                <p key={i} className={styles.suggestion}>{item}</p>
              ))}
            </div>
          )}
          {location.practical && (
            <p className={styles.practical}>{location.practical}</p>
          )}
        </div>
      )}

      {/* Expanded panel: other locations on the same day */}
      {showNearby && siblings.length > 0 && (
        <div className={styles.panel}>
          <p className={styles.nearbyLabel}>Also in this area</p>
          <div className={styles.nearbyList}>
            {siblings.map(s => (
              <div key={s.id} className={styles.nearbyItem}>
                <span className={styles.nearbyName}>{s.name}</span>
                <span className={styles.nearbyDot}>·</span>
                <span className={styles.nearbyNeighbourhood}>{s.neighbourhood}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </article>
  )
}
