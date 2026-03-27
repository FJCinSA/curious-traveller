import { useMemo } from 'react'
import { days } from '../data/itinerary'
import styles from './Greeting.module.css'

function salutation(hour) {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

export default function Greeting() {
  const content = useMemo(() => {
    const hour = new Date().getHours()
    const greeting = salutation(hour)
    const today = todayISO()
    const entry = days.find(d => d.date === today)

    if (entry) {
      return {
        greeting,
        dayLine: entry.dayLine,
        messageLine: entry.messageLine,
      }
    }

    if (today < '2026-03-30') {
      return {
        greeting,
        dayLine: 'Your honeymoon begins on 30 March.',
        messageLine: 'Singapore and Korea are waiting. Something extraordinary is coming.',
      }
    }

    return {
      greeting,
      dayLine: 'The honeymoon.',
      messageLine: '18 days. Two countries. The companion remembers every one of them.',
    }
  }, [])

  return (
    <div className={styles.greeting}>
      <p className={styles.salutation}>
        {content.greeting}, Francois &amp; James.
      </p>
      <p className={styles.dayLine}>{content.dayLine}</p>
      <p className={styles.messageLine}>{content.messageLine}</p>
    </div>
  )
}
