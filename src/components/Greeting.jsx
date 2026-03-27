// Personalised greeting shown on the home screen below the header.
// Reads the device clock and today's date, matches against the trip itinerary,
// and returns one of three states:
//   • A specific honeymoon-day message (if today is a trip day)
//   • A countdown message (before the trip starts)
//   • A memory message (after the trip ends)
import { useMemo } from 'react'
import { days, TRIP_START } from '../data/itinerary'
import styles from './Greeting.module.css'

// Returns the appropriate time-of-day salutation for the current hour
function salutation(hour) {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

// Returns today's date as a YYYY-MM-DD string — matches the format used in itinerary.js
function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function Greeting() {
  // Computed once at mount — the greeting only needs to change on page refresh,
  // not dynamically while the app is open, so an empty dependency array is correct.
  const content = useMemo(() => {
    const hour = new Date().getHours()
    const greeting = salutation(hour)
    const today = todayISO()

    // Check if today matches a specific day in the itinerary
    const entry = days.find(d => d.date === today)
    if (entry) {
      return {
        greeting,
        location:    entry.location,
        dayLine:     entry.dayLine,
        messageLine: entry.messageLine,
      }
    }

    // Before the trip — show a pre-departure message
    if (today < TRIP_START) {
      return {
        greeting,
        location:    null,
        dayLine:     'Your honeymoon begins on 30 March.',
        messageLine: 'Singapore and Korea are waiting. Something extraordinary is coming.',
      }
    }

    // After the trip — show a retrospective message
    return {
      greeting,
      location:    null,
      dayLine:     'The honeymoon.',
      messageLine: '18 days. Two countries. The companion remembers every one of them.',
    }
  }, [])

  return (
    <div className={styles.greeting}>
      <p className={styles.salutation}>
        {content.greeting}, Francois &amp; James.
      </p>
      {/* Current location — shown during the trip, e.g. "Singapore", "Seoul → Hong Kong" */}
      {content.location && (
        <p className={styles.location}>{content.location}</p>
      )}
      <p className={styles.dayLine}>{content.dayLine}</p>
      <p className={styles.messageLine}>{content.messageLine}</p>
    </div>
  )
}
