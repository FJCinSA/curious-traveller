// Home screen — header, personalised greeting, trip progress bar, and destination card grid.
// Each card is a button that navigates to that trip's chapter via onSelect.
// Cards reflect the trip's status: past (dimmed), current (gold glow + pulsing dot), future (normal).
import { skylineMap } from './Skylines'
import Greeting from './Greeting'
import { TRIP_START, TRIP_END } from '../data/itinerary'
import styles from './Home.module.css'

// Returns today as a YYYY-MM-DD string — matches ISO dates used throughout the app
function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

// Returns progress info if today is within the trip window, otherwise null
function getTripProgress(today) {
  if (today < TRIP_START || today > TRIP_END) return null
  const start  = new Date(TRIP_START + 'T00:00:00Z')
  const now    = new Date(today     + 'T00:00:00Z')
  const totalDays  = 18
  const currentDay = Math.round((now - start) / 86_400_000) + 1
  return { currentDay, totalDays }
}

// Determines whether a trip is in the past, current, or upcoming relative to today
function getTripStatus(trip, today) {
  if (!trip.startDate || !trip.endDate) return 'future'
  if (today > trip.endDate)  return 'past'
  if (today >= trip.startDate) return 'current'
  return 'future'
}

export default function Home({ trips, onSelect }) {
  const today    = todayISO()
  const progress = getTripProgress(today)

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

      {/* Progress bar — only shown while the trip is active (30 March – 16 April) */}
      {progress && (
        <div className={styles.progressWrap}>
          <div className={styles.progressLabel}>
            Day {progress.currentDay} of {progress.totalDays}
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${(progress.currentDay / progress.totalDays) * 100}%` }}
            />
          </div>
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.grid}>
          {trips.map(trip => {
            const SkylineSVG = skylineMap[trip.theme]
            const status     = getTripStatus(trip, today)
            // Total stops across all days — shown as a badge on the card
            const totalStops = trip.days.reduce((n, d) => n + d.locations.length, 0)

            return (
              <button
                key={trip.id}
                className={[
                  styles.card,
                  trip.wide          ? styles.wide    : '',
                  status === 'past'  ? styles.past    : '',
                  status === 'current' ? styles.current : '',
                ].filter(Boolean).join(' ')}
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
                    {/* Pulsing gold dot — indicates the destination you are currently in */}
                    {status === 'current' && (
                      <span className={styles.pulseDot} aria-label="You are here" />
                    )}
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
        <p className={styles.footerCredit}>Built with care. 27 March 2026.</p>
      </footer>

    </div>
  )
}
