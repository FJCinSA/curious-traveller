// Full-width hero section at the top of every trip chapter.
// Renders the city's SVG skyline as a background, overlays a dark gradient,
// and displays the trip title, dates, hotel, and tagline.
import { skylineMap } from './Skylines'
import styles from './Hero.module.css'

export default function Hero({ trip }) {
  // Look up the SVG component for this city by its theme key
  const SkylineSVG = skylineMap[trip.theme]

  return (
    <header className={styles.hero}>
      {/* Skyline SVG fills the full hero — aria-hidden because it is decorative */}
      {SkylineSVG && (
        <div className={styles.skyline} aria-hidden="true">
          <SkylineSVG />
        </div>
      )}

      {/* Dark overlay sits between the skyline and the text for readability */}
      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={styles.eyebrow}>The Curious Traveller</p>
        <h1 className={styles.city}>{trip.city}</h1>
        <p className={styles.dates}>{trip.dates}</p>
        {trip.hotel && <p className={styles.hotel}>{trip.hotel}</p>}
        <p className={styles.tagline}>{trip.tagline}</p>
      </div>

      {/* Scroll indicator — bounces via CSS animation */}
      <div className={styles.scroll}>
        <span>↓</span>
      </div>
    </header>
  )
}
