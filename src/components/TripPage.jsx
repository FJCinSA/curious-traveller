// Full trip chapter page — shown when a destination card is selected from the home screen.
// Contains a hero header, a day-tab navigation bar, a summary strip, and the day sections.
// Keyed on trip.id in App.jsx so state resets completely when navigating between trips.
import { useState } from 'react'
import Hero from './Hero'
import DayView from './DayView'
import styles from './TripPage.module.css'

// Returns the correct label for the nights summary strip
function nightsLabel(nights) {
  if (nights === 0) return 'day trip'
  if (nights === 1) return 'night'
  return 'nights'
}

export default function TripPage({ trip, onBack }) {
  // null = show all days; a day.id = show only that day
  const [activeDay, setActiveDay] = useState(null)
  const visibleDays = activeDay === null
    ? trip.days
    : trip.days.filter(d => d.id === activeDay)

  // Total stops across whichever days are currently visible
  const visibleStops = visibleDays.reduce((n, d) => n + d.locations.length, 0)

  return (
    <div className={styles.page}>

      {/* Fixed back button — always accessible while scrolling */}
      <button className={styles.back} onClick={onBack} aria-label="All destinations">
        ← All Trips
      </button>

      <Hero trip={trip} />

      <main className={styles.main}>

        {/* Day tab bar — hidden for single-day trips (Jinhae) */}
        <nav className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeDay === null ? styles.active : ''}`}
            onClick={() => setActiveDay(null)}
          >
            {trip.days.length === 1 ? 'Itinerary' : 'All Days'}
          </button>
          {trip.days.length > 1 && trip.days.map(day => (
            <button
              key={day.id}
              className={`${styles.tab} ${activeDay === day.id ? styles.active : ''}`}
              onClick={() => setActiveDay(day.id)}
            >
              {day.label}
            </button>
          ))}
        </nav>

        {/* Summary strip — stops count, nights, country flag */}
        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNum}>{visibleStops}</span>
            <span className={styles.summaryLabel}>stops</span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryItem}>
            <span className={styles.summaryNum}>{trip.nights || '—'}</span>
            <span className={styles.summaryLabel}>{nightsLabel(trip.nights)}</span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryItem}>
            <span className={styles.summaryNum}>{trip.flag}</span>
            <span className={styles.summaryLabel}>{trip.country}</span>
          </div>
        </div>

        {/* Day sections */}
        <div className={styles.days}>
          {visibleDays.map(day => (
            <DayView key={day.id} day={day} />
          ))}
        </div>

      </main>

      <footer className={styles.footer}>
        <p>The Curious Traveller &nbsp;·&nbsp; {trip.city} 2026</p>
        <p className={styles.footerSub}>For Francois &amp; James</p>
      </footer>

    </div>
  )
}
