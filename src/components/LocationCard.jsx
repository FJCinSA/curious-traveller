// A single location card — the core content unit of every trip chapter.
// Shows neighbourhood, name, and a one-sentence wow fact at all times.
// Three expandable/action areas:
//   "Tell me more" — history, suggested activities, and practical info
//   "What's nearby" — other locations on the same day, from the siblings prop
//   Navigation row — smart transport buttons based on GPS distance (Korean chapters)
// Only one panel can be open at a time.
import { useState, useEffect } from 'react'
import { useSlowTravel } from '../context/SlowTravelContext'
import styles from './LocationCard.module.css'
import NavigateButton from './NavigateButton'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function formatDateNice(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}

function buildCaption(location, city, country) {
  const date = formatDateNice(new Date().toISOString().slice(0, 10))
  const tag = s => '#' + s.replace(/\s+/g, '')
  return [
    `${location.name}, ${city}.`,
    location.wow,
    location.history,
    `Visited ${date}. 🌸`,
    `${tag(city)} ${tag(country)} #CuriousTraveller`,
  ].filter(Boolean).join('\n')
}

// Haversine formula — returns distance in kilometres between two lat/lng points
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function LocationCard({ location, siblings = [], isKorean = false, city = '', country = '' }) {
  const [showMore, setShowMore]     = useState(false)
  const [showNearby, setShowNearby] = useState(false)
  const [copied, setCopied]         = useState(false)
  const { slowTravel } = useSlowTravel()

  function handleCopyCaption() {
    try {
      const caption = buildCaption(location, city, country)
      navigator.clipboard.writeText(caption).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2100)
      }).catch(() => {})
    } catch {}
  }
  const leadText = slowTravel && location.slowNote ? location.slowNote : location.wow

  // GPS-based transport mode — Korean chapters only.
  // null  = GPS not yet available → show all buttons with equal weight
  // walk  = < 1 km → show only Walk (Naver Maps)
  // near  = 1–5 km → show all three buttons equally
  // far   = > 5 km → taxi buttons prominent, Navigate dimmed
  const [transportMode, setTransportMode] = useState(null)

  useEffect(() => {
    if (!isKorean || !location.coords || !navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const km = haversineKm(
          coords.latitude, coords.longitude,
          location.coords.lat, location.coords.lng
        )
        setTransportMode(km < 1 ? 'walk' : km <= 5 ? 'near' : 'far')
      },
      () => { /* GPS denied or unavailable — buttons shown equally */ },
      { timeout: 8000, maximumAge: 120000 }
    )
  }, []) // intentionally run once on mount; maximumAge means subsequent calls are free

  const toggleMore = () => {
    setShowMore(v => !v)
    if (!showMore) setShowNearby(false)
  }

  const toggleNearby = () => {
    setShowNearby(v => !v)
    if (!showNearby) setShowMore(false)
  }

  const isWalk = transportMode === 'walk'
  const isFar  = transportMode === 'far'

  return (
    <article className={styles.card} style={{ '--accent': location.accent }}>

      <header className={styles.header}>
        <p className={styles.neighbourhood}>{location.neighbourhood}</p>
        <h3 className={styles.name}>{location.name}</h3>
      </header>

      {/* Lead text — wow fact normally, slowNote when slow travel mode is active */}
      <p className={`${styles.wow} ${slowTravel && location.slowNote ? styles.wowSlow : ''}`}>{leadText}</p>

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

      {/* Navigation row — smart transport suggestions based on GPS distance */}
      <NavigateButton
        lat={location.coords?.lat}
        lng={location.coords?.lng}
        name={location.name}
        isKorean={isKorean}
        isWalk={isWalk}
        isFar={isFar}
      />

      {/* Copy Caption — social media caption to clipboard */}
      <div className={styles.captionRow}>
        <button
          className={styles.captionBtn}
          onClick={handleCopyCaption}
          aria-label="Copy social media caption to clipboard"
        >
          Copy Caption
        </button>
      </div>

      {/* Toast — appears for 2 seconds after copy */}
      {copied && (
        <p className={styles.copyToast} aria-live="polite">
          Caption copied. Ready to share. 🌸
        </p>
      )}

    </article>
  )
}
