// Full-width hero section at the top of every trip chapter.
// Renders the city's SVG skyline as a background, overlays a dark gradient,
// and displays the trip title, dates, hotel, and tagline.
// On 3 April the Jinhae title animates in letter by letter.
import { skylineMap } from './Skylines'
import { todayISO } from '../utils/dates'
import styles from './Hero.module.css'

// Each character fades and rises in with a staggered delay.
function AnimatedCityName({ name }) {
  return (
    <h1 className={styles.city} aria-label={name}>
      {name.split('').map((char, i) => (
        <span
          key={i}
          className={styles.cityChar}
          style={{ animationDelay: `${i * 0.08}s` }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  )
}

export default function Hero({ trip }) {
  const SkylineSVG  = skylineMap[trip.theme]
  const today       = todayISO()
  const animateCity = trip.id === 'jinhae' && today === '2026-04-03'

  return (
    <header className={styles.hero}>
      {SkylineSVG && (
        <div className={styles.skyline} aria-hidden="true">
          <SkylineSVG />
        </div>
      )}

      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={styles.eyebrow}>The Curious Traveller</p>
        {animateCity
          ? <AnimatedCityName name={trip.city} />
          : <h1 className={styles.city}>{trip.city}</h1>
        }
        <p className={styles.dates}>{trip.dates}</p>
        {trip.hotel && <p className={styles.hotel}>{trip.hotel}</p>}
        <p className={styles.tagline}>{trip.tagline}</p>
      </div>

      <div className={styles.scroll}>
        <span>↓</span>
      </div>
    </header>
  )
}
