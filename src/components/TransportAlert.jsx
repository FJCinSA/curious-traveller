// Smart transport reminders shown at the right moment in the right chapter.
// Jinhae chapter on the evening of 2 April: book taxi for tomorrow.
// Busan chapter on the morning of 3 April: departure reminder.
import { todayISO } from '../utils/dates'
import styles from './TransportAlert.module.css'

export default function TransportAlert({ tripId }) {
  const today = todayISO()
  const hour = new Date().getHours()

  // Evening of 2 April on the Jinhae chapter: book the taxi
  if (tripId === 'jinhae' && today === '2026-04-02' && hour >= 18) {
    return (
      <div className={`${styles.alert} ${styles.amber}`}>
        <span className={styles.alertIcon}>⚠</span>
        <div className={styles.alertBody}>
          <p className={styles.alertText}>
            Tomorrow is the cherry blossom day. Ask the front desk <em>now</em> to book a taxi for 07:00. The cherry trees will not wait.
          </p>
        </div>
      </div>
    )
  }

  // Morning of 3 April on the Busan chapter: departure reminder
  if (tripId === 'busan' && today === '2026-04-03' && hour < 11) {
    return (
      <div className={`${styles.alert} ${styles.blue}`}>
        <span className={styles.alertIcon}>🌸</span>
        <div className={styles.alertBody}>
          <p className={styles.alertText}>
            Your taxi should be booked for 07:00. Seobu Terminal, then the 07:30 bus to Jinhae. You arrive at 08:30. The canal will be yours.
          </p>
        </div>
      </div>
    )
  }

  return null
}
