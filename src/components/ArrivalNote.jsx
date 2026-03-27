// Arrival note — shown at the top of each destination chapter.
// Speaks directly to Francois and James in companion voice, acknowledging they are tired
// and telling them exactly what to do first. Warm and calm, never clinical.
// Only rendered when trip.arrival is defined (Jinhae, a day trip, has none).
import styles from './ArrivalNote.module.css'

export default function ArrivalNote({ arrival }) {
  if (!arrival) return null

  return (
    <div className={styles.note}>
      <span className={styles.symbol}>✦</span>
      <p className={styles.text}>{arrival}</p>
    </div>
  )
}
