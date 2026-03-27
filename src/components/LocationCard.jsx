// A single location card — the core content unit of every trip chapter.
// Shows neighbourhood, name, and a one-sentence wow fact at all times.
// Three expandable/action areas:
//   "Tell me more" — history, suggested activities, and practical info
//   "What's nearby" — other locations on the same day, from the siblings prop
//   "Navigate here" — opens Naver Maps from current GPS to this location (if coords present)
// Only one panel can be open at a time.
import { useState } from 'react'
import { useSlowTravel } from '../context/SlowTravelContext'
import styles from './LocationCard.module.css'

// Builds a Naver Maps directions URL from current GPS location to the given coordinates.
// lng,lat order is correct for Naver Maps path parameters.
function buildNaverUrl(coords, name) {
  const { lat, lng } = coords
  return `https://map.naver.com/v5/directions/-/${lng},${lat},${encodeURIComponent(name)},-/walk`
}

// Builds a Kakao Taxi deep link. Falls back to kakaomobility.com if the app isn't installed.
function buildKakaoUrl(coords, name) {
  const { lat, lng } = coords
  return `kakaot://taxi?dest_name=${encodeURIComponent(name)}&dest_lat=${lat}&dest_lng=${lng}`
}

function handleKakaoClick(e, coords, name) {
  e.preventDefault()
  const deep = buildKakaoUrl(coords, name)
  const fallback = 'https://www.kakaomobility.com'
  // Attempt to open the app; if it doesn't launch within 1.5s, open the web fallback
  const start = Date.now()
  window.location = deep
  setTimeout(() => {
    if (Date.now() - start < 2000) {
      window.open(fallback, '_blank', 'noopener,noreferrer')
    }
  }, 1500)
}

export default function LocationCard({ location, siblings = [] }) {
  const [showMore, setShowMore]     = useState(false)
  const [showNearby, setShowNearby] = useState(false)
  const { slowTravel } = useSlowTravel()
  const leadText = slowTravel && location.slowNote ? location.slowNote : location.wow

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

      {/* Lead text — wow fact normally, slowNote when slow travel mode is active */}
      <p className={styles.wow}>{leadText}</p>

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

      {/* Navigation row — Naver Maps + Kakao Taxi, shown when coords are present */}
      {location.coords && (
        <div className={styles.navRow}>
          <a
            href={buildNaverUrl(location.coords, location.name)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navigate}
          >
            Navigate here ↗
          </a>
          <a
            href={buildKakaoUrl(location.coords, location.name)}
            onClick={(e) => handleKakaoClick(e, location.coords, location.name)}
            className={styles.kakaoTaxi}
          >
            🚕 Kakao Taxi
          </a>
        </div>
      )}

    </article>
  )
}
