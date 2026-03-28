// JourneyMap — compact horizontal route shown on the home screen below the destination grid.
// Shows the six stops of the honeymoon with gold dots and connecting lines.
// Past: filled gold, dimmed. Current: pulsing gold dot. Future: outlined.
import { JOURNEY_STOPS, TRIP_START, TRIP_END, getStopStatus, getCurrentStop, getHoneymoonDay } from '../data/journey'
import { todayISO } from '../utils/dates'
import styles from './JourneyMap.module.css'

export default function JourneyMap({ onOpenJourney }) {
  const today       = todayISO()
  const isBeforeTrip = today < TRIP_START
  const isAfterTrip  = today > TRIP_END
  const currentStop  = getCurrentStop(today)
  const dayNumber    = getHoneymoonDay(today)

  let statusLine = null
  if (isBeforeTrip) {
    const days = Math.round(
      (new Date(TRIP_START + 'T00:00:00Z') - new Date(today + 'T00:00:00Z')) / 86_400_000
    )
    statusLine = `Francois and James depart on their honeymoon in ${days} day${days === 1 ? '' : 's'}.`
  } else if (!isAfterTrip && currentStop) {
    statusLine = `Francois and James are currently in ${currentStop.city}, ${currentStop.country}. Day ${dayNumber} of their honeymoon.`
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <p className={styles.sectionLabel}>Live Journey</p>

        {/* Horizontal route — dots and connecting lines */}
        <div className={styles.track}>
          {JOURNEY_STOPS.map((stop, i) => {
            const status  = getStopStatus(stop, today)
            const isLast  = i === JOURNEY_STOPS.length - 1
            // Line after this dot is gold if this stop is past or current
            const lineGold = status === 'past' || status === 'current'

            return (
              <div key={stop.id} className={styles.trackRow}>
                {/* Stop column: dot + label */}
                <div className={styles.stopCol}>
                  <div className={`${styles.dot} ${styles['dot_' + status]}`}>
                    {status === 'current' && <span className={styles.pulseRing} />}
                  </div>
                  <span className={`${styles.stopLabel} ${styles['label_' + status]}`}>
                    {stop.label}
                  </span>
                </div>
                {/* Connector line to next stop */}
                {!isLast && (
                  <div className={`${styles.connector} ${lineGold ? styles.connectorGold : ''}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Status text */}
        {isAfterTrip ? (
          <div className={styles.afterTrip}>
            <p>Francois and James have returned home.</p>
            <p>What an extraordinary journey.</p>
          </div>
        ) : statusLine ? (
          <p className={styles.statusLine}>{statusLine}</p>
        ) : null}

        {/* View full journey link */}
        <button className={styles.viewBtn} onClick={onOpenJourney}>
          View full journey →
        </button>

      </div>
    </section>
  )
}
