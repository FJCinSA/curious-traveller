// NavigateButton — plain https:// web URLs only. No app deep-link schemes.
// kakaot:// and similar schemes cause black screens when the app is not
// installed. Every link opens in a new browser tab. If anything throws,
// returns null silently — never a black screen, ever.
import styles from './LocationCard.module.css'

// Naver Maps web URL — opens in browser, works without the app installed.
// Korean chapters only.
function buildNaverUrl(lat, lng, name) {
  return `https://map.naver.com/v5/directions/-/${lng},${lat},${encodeURIComponent(name)},-/walk`
}

// Google Maps directions URL — used for Singapore chapters.
// Works on every device in every browser without any app.
function buildGoogleUrl(lat, lng) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}

export default function NavigateButton({
  lat,
  lng,
  name,
  isKorean = false,
  isWalk   = false,
  isFar    = false,
}) {
  try {
    // Guard: return nothing if coordinates are missing or invalid.
    // No error, no black screen — the card just shows without nav buttons.
    if (!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) return null

    const navUrl = isKorean
      ? buildNaverUrl(lat, lng, name)
      : buildGoogleUrl(lat, lng)

    return (
      <div className={styles.navRow}>

        {/* Navigate / Walk — always shown; Google Maps for SG, Naver for Korea */}
        <a
          href={navUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.navBtn} ${isFar ? styles.navBtnDim : ''}`}
        >
          {isWalk ? '🚶 Walk' : '↗ Navigate'}
        </a>

        {/* Kakao Taxi — Korean chapters, not walk distance.
            Opens kakaomobility.com — no app scheme, no black screen. */}
        {isKorean && !isWalk && (
          <a
            href="https://www.kakaomobility.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.navBtn} ${isFar ? styles.navBtnProminent : ''}`}
          >
            🚕 Kakao Taxi
          </a>
        )}

        {/* KRide — Korean chapters, not walk distance. */}
        {isKorean && !isWalk && (
          <a
            href="https://www.kride.app"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.navBtn} ${isFar ? styles.navBtnProminent : ''}`}
          >
            🚖 KRide
          </a>
        )}

      </div>
    )
  } catch {
    // If anything throws — return null silently. Never a black screen.
    return null
  }
}
