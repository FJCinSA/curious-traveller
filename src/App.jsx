import { useState } from 'react'
import Hero from './components/Hero'
import DayView from './components/DayView'
import InstallPrompt from './components/InstallPrompt'
import { trip, days } from './data/singapore'
import styles from './App.module.css'

export default function App() {
  const [activeDay, setActiveDay] = useState(null)

  const visibleDays = activeDay === null ? days : days.filter(d => d.id === activeDay)

  return (
    <div className={styles.app}>
      <Hero trip={trip} />

      <main className={styles.main}>
        {/* Day filter tabs */}
        <nav className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeDay === null ? styles.active : ''}`}
            onClick={() => setActiveDay(null)}
          >
            All Days
          </button>
          {days.map(day => (
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
            <span className={styles.summaryNum}>{visibleDays.length}</span>
            <span className={styles.summaryLabel}>{visibleDays.length === 1 ? 'day' : 'days'}</span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryItem}>
            <span className={styles.summaryNum}>∞</span>
            <span className={styles.summaryLabel}>memories</span>
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
        <p>The Curious Traveller &nbsp;·&nbsp; Singapore 2026</p>
        <p className={styles.footerSub}>For Francois &amp; James</p>
      </footer>

      <InstallPrompt />
    </div>
  )
}
