// Home screen — header, personalised greeting, and the destination card grid.
// Each card is a button that navigates to that trip's chapter via onSelect.
// Cards with trip.wide === true span two columns in the grid.
import { skylineMap } from './Skylines'
import Greeting from './Greeting'
import styles from './Home.module.css'

export default function Home({ trips, onSelect }) {
  return (
    <div className={styles.home}>

      <header className={styles.header}>
        <p className={styles.eyebrow}>For Francois &amp; James</p>
        <h1 className={styles.title}>The Curious<br />Traveller</h1>
        <p className={styles.subtitle}>March – April 2026</p>
        <p className={styles.companionLine}>A wise and patient companion for the curious.</p>
      </header>

      {/* Daily greeting — reads device clock and itinerary to show a contextual message */}
      <Greeting />

      <main className={styles.main}>
        <div className={styles.grid}>
          {trips.map(trip => {
            const SkylineSVG = skylineMap[trip.theme]
            // Total stops across all days — shown as a badge on the card
            const totalStops = trip.days.reduce((n, d) => n + d.locations.length, 0)

            return (
              <button
                key={trip.id}
                className={`${styles.card} ${trip.wide ? styles.wide : ''}`}
                onClick={() => onSelect(trip.id)}
                aria-label={`Open ${trip.city} chapter`}
              >
                {/* Skyline SVG fills the card background */}
                {SkylineSVG && (
                  <div className={styles.cardSkyline}>
                    <SkylineSVG />
                  </div>
                )}

                {/* Gradient overlay dims the skyline so card text stays readable */}
                <div className={styles.cardOverlay} style={{ background: trip.cardGradient }} />

                {/* Text content — positioned above the overlay via z-index */}
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

                {/* Arrow slides right on hover via CSS transition */}
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
