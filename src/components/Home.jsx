// Home screen — header, personalised greeting, trip progress bar, and destination card grid.
// Each card is a button that navigates to that trip's chapter via onSelect.
// Cards reflect the trip's status: past (dimmed), current (gold glow + pulsing dot), future (normal).
import { skylineMap } from './Skylines'
import Greeting from './Greeting'
import DawnNote from './DawnNote'
import SerendipityButton from './SerendipityButton'
import { useSlowTravel } from '../context/SlowTravelContext'
import { TRIP_START, TRIP_END } from '../data/itinerary'
import styles from './Home.module.css'

// Returns today as a YYYY-MM-DD string — matches ISO dates used throughout the app
function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

// Returns a progress/countdown object for the bar below the greeting, or null after the trip.
//   Before trip:      { label: 'Your adventure begins in X days', pct: null }
//   Departure day:    { label: 'Today you begin.', pct: null }
//   During trip:      { label: 'Day X of 18', pct: 0–100 }
//   After trip ends:  null (bar hidden)
function getTripProgress(today) {
  // Pre-departure countdown
  if (today < TRIP_START) {
    const daysLeft = Math.round(
      (new Date(TRIP_START + 'T00:00:00Z') - new Date(today + 'T00:00:00Z')) / 86_400_000
    )
    return {
      label: `Your adventure begins in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`,
      pct: null,
    }
  }
  // After the trip is fully over — hide the bar
  if (today > TRIP_END) return null
  // Departure day — first day of the trip
  if (today === TRIP_START) {
    return { label: 'Today you begin.', pct: null }
  }
  // In-trip progress
  const currentDay = Math.round(
    (new Date(today + 'T00:00:00Z') - new Date(TRIP_START + 'T00:00:00Z')) / 86_400_000
  ) + 1
  return { label: `Day ${currentDay} of 18`, pct: (currentDay / 18) * 100 }
}

// Determines whether a trip is in the past, current, or upcoming relative to today.
// 'current' applies the gold glow border and pulsing dot to the card.
// Before 31 March all cards show as 'future' — this is correct and intentional.
// The gold glow activates automatically on 31 March when Singapore's window opens.
function getTripStatus(trip, today) {
  if (!trip.startDate || !trip.endDate) return 'future'
  if (today > trip.endDate)    return 'past'
  if (today >= trip.startDate) return 'current'
  return 'future'
}

export default function Home({ trips, onSelect, onOpenChecklist, onOpenMemoryJar }) {
  const today    = todayISO()
  const progress = getTripProgress(today)
  const { slowTravel, setSlowTravel } = useSlowTravel()

  // Serendipity: use the current destination's serendipity, fall back to first trip
  const currentTrip = trips.find(t => {
    const s = getTripStatus(t, today)
    return s === 'current'
  }) || trips[0]
  const serendipity = currentTrip?.serendipity || []

  return (
    <div className={styles.home}>

      {/* Top bar — checklist left, slow travel + memory jar right */}
      <div className={styles.topBar}>
        <div className={styles.topLeft}>
          <button
            className={styles.topBtn}
            onClick={onOpenChecklist}
            aria-label="Open pre-departure checklist"
            title="Before you leave"
          >
            ✓ Before you leave
          </button>
        </div>
        <div className={styles.topRight}>
          <button
            className={`${styles.topBtn} ${styles.slowToggle} ${slowTravel ? styles.slowOn : ''}`}
            onClick={() => setSlowTravel(v => !v)}
            aria-label={slowTravel ? 'Slow travel mode on' : 'Slow travel mode off'}
            title="Slow Travel Mode"
          >
            🐢
          </button>
          <button
            className={styles.topBtn}
            onClick={onOpenMemoryJar}
            aria-label="Open memory jar"
            title="Memory Jar"
          >
            ◇ Memories
          </button>
        </div>
      </div>

      <header className={styles.header}>
        <p className={styles.eyebrow}>For Francois &amp; James</p>
        <h1 className={styles.title}>The Curious<br />Traveller</h1>
        <p className={styles.subtitle}>March – April 2026</p>
        <p className={styles.companionLine}>A wise and patient companion for the curious.</p>
      </header>

      {/* Dawn note — shows a date-specific sentence before 11am */}
      <DawnNote />

      {/* Daily greeting — reads device clock and itinerary to show a contextual message */}
      <Greeting />

      {/* Countdown before trip / progress during trip — hidden after 16 April */}
      {progress && (
        <div className={styles.progressWrap}>
          <div className={styles.progressLabel}>{progress.label}</div>
          {/* Track only shown during the trip once underway — not for countdown or departure day */}
          {progress.pct !== null && (
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress.pct}%` }}
              />
            </div>
          )}
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

      {/* Serendipity button — fixed bottom-right, city-specific suggestions */}
      <SerendipityButton serendipity={serendipity} />

    </div>
  )
}
