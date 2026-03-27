import { useState } from 'react'
import Hero from './Hero'
import DayView from './DayView'
import styles from './TripPage.module.css'

export default function TripPage({ trip, onBack }) {
  const [activeDay, setActiveDay] = useState(null)
  const visibleDays = activeDay === null ? trip.days : trip.days.filter(d => d.id === activeDay)

  return (
    <div className={styles.page}>
      {/* Back button — fixed top-left */}
      <button className={styles.back} onClick={onBack} aria-label="All destinations">
        ← All Trips
      </button>

      <Hero trip={trip} />

      <main className={styles.main}>
        {/* Day tabs */}
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

        {/* Summary bar */}
        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryNum}>
              {visibleDays.reduce((n, d) => n + d.locations.length, 0)}
            </span>
            <span className={styles.summaryLabel}>stops</span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryItem}>
            <span className={styles.summaryNum}>{trip.nights || '½'}</span>
            <span className={styles.summaryLabel}>{trip.nights === 1 ? 'night' : 'nights'}</span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryItem}>
            <span className={styles.summaryNum}>{trip.flag}</span>
            <span className={styles.summaryLabel}>{trip.country}</span>
          </div>
        </div>

        {/* Days */}
        <div className={styles.days}>
          {visibleDays.map(day => (
            <DayView key={day.id} day={day} />
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>The Curious Traveller &nbsp;·&nbsp; {trip.city} {new Date(trip.dates.split('–')[0].trim() + ' 2026').getFullYear() || '2026'}</p>
        <p className={styles.footerSub}>For Francois &amp; James</p>
      </footer>
    </div>
  )
}
