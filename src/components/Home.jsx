import { SingaporeSkyline, BusanSkyline, JinhaeSkyline, GyeongjuSkyline, SeoulSkyline } from './Skylines'
import styles from './Home.module.css'

const skylineMap = {
  singapore: SingaporeSkyline,
  busan: BusanSkyline,
  jinhae: JinhaeSkyline,
  gyeongju: GyeongjuSkyline,
  seoul: SeoulSkyline,
}

export default function Home({ trips, onSelect }) {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>For Francois &amp; James</p>
        <h1 className={styles.title}>The Curious<br />Traveller</h1>
        <p className={styles.subtitle}>March – April 2026</p>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {trips.map(trip => {
            const SkylineSVG = skylineMap[trip.theme]
            const totalStops = trip.days.reduce((n, d) => n + d.locations.length, 0)

            return (
              <button
                key={trip.id}
                className={`${styles.card} ${trip.id === 'seoul' || trip.id === 'singapore' ? styles.wide : ''}`}
                onClick={() => onSelect(trip.id)}
                aria-label={`Open ${trip.city} chapter`}
              >
                {/* Mini skyline */}
                <div className={styles.cardSkyline}>
                  <SkylineSVG />
                </div>

                {/* Gradient overlay on skyline */}
                <div className={styles.cardOverlay} style={{ background: trip.cardGradient }} />

                {/* Card content */}
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <span className={styles.flag}>{trip.flag}</span>
                    <span className={styles.country}>{trip.country}</span>
                  </div>
                  <h2 className={styles.cardCity}>{trip.city}</h2>
                  <p className={styles.cardDates}>{trip.dates}</p>
                  {trip.hotel && (
                    <p className={styles.cardHotel}>{trip.hotel}</p>
                  )}
                  <div className={styles.cardMeta}>
                    <span className={styles.cardStops}>{totalStops} stops</span>
                    {trip.nights > 0 && (
                      <span className={styles.cardNights}>
                        {trip.nights} {trip.nights === 1 ? 'night' : 'nights'}
                      </span>
                    )}
                    {trip.nights === 0 && (
                      <span className={styles.cardNights}>day trip</span>
                    )}
                  </div>
                </div>

                <div className={styles.cardArrow} style={{ color: trip.heroAccent }}>→</div>
              </button>
            )
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>The Curious Traveller · 2026</p>
      </footer>
    </div>
  )
}
