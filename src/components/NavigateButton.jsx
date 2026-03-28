// NavigateButton — renders the navigation row for a location card.
// Accepts lat/lng directly so it can guard against null/invalid coordinates
// before attempting to build any URLs.
import styles from './LocationCard.module.css'

const KRIDE_URL = 'https://www.kride.app'

function buildNaverUrl(lat, lng, name) {
  return `https://map.naver.com/v5/directions/-/${lng},${lat},${encodeURIComponent(name)},-/walk`
}

function buildKakaoUrl(lat, lng, name) {
  return `kakaot://taxi?dest_name=${encodeURIComponent(name)}&dest_lat=${lat}&dest_lng=${lng}`
}

function handleKakaoClick(e, lat, lng, name) {
  e.preventDefault()
  const start = Date.now()
  window.location = buildKakaoUrl(lat, lng, name)
  setTimeout(() => {
    if (Date.now() - start < 2000) {
      window.open('https://www.kakaomobility.com', '_blank', 'noopener,noreferrer')
    }
  }, 1500)
}

export default function NavigateButton({ lat, lng, name, isKorean = false, isWalk = false, isFar = false }) {
  if (!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) return null

  return (
    <div className={styles.navRow}>

      {/* Navigate / Walk — always shown; label changes based on distance */}
      <a
        href={buildNaverUrl(lat, lng, name)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.navBtn} ${isFar ? styles.navBtnDim : ''}`}
      >
        {isWalk ? '🚶 Walk' : '↗ Navigate'}
      </a>

      {/* Kakao Taxi — hidden when under 1 km */}
      {!isWalk && (
        <a
          href={buildKakaoUrl(lat, lng, name)}
          onClick={(e) => handleKakaoClick(e, lat, lng, name)}
          className={`${styles.navBtn} ${isFar ? styles.navBtnProminent : ''}`}
        >
          🚕 Kakao Taxi
        </a>
      )}

      {/* KRide — Korean chapters only, hidden when under 1 km */}
      {isKorean && !isWalk && (
        <a
          href={KRIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.navBtn} ${isFar ? styles.navBtnProminent : ''}`}
        >
          🚖 KRide
        </a>
      )}

    </div>
  )
}
