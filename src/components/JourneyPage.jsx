// JourneyPage — full-page journey tracker for family and friends.
// Shows the complete honeymoon route as a warm vertical timeline.
// Accessible at #journey via the Journey button on the home screen.
import {
  JOURNEY_STOPS,
  TRIP_START,
  TRIP_END,
  getStopStatus,
  getCurrentStop,
  getHoneymoonDay,
  getDaysTravelled,
  getDaysRemaining,
} from '../data/journey'
import { todayISO } from '../utils/dates'
import styles from './JourneyPage.module.css'

export default function JourneyPage({ onClose }) {
  const today          = todayISO()
  const isBeforeTrip   = today < TRIP_START
  const isAfterTrip    = today > TRIP_END
  const currentStop    = getCurrentStop(today)
  const dayNumber      = getHoneymoonDay(today)
  const daysTravelled  = getDaysTravelled(today)
  const daysRemaining  = getDaysRemaining(today)

  const daysUntilDeparture = isBeforeTrip
    ? Math.round(
        (new Date(TRIP_START + 'T00:00:00Z') - new Date(today + 'T00:00:00Z')) / 86_400_000
      )
    : null

  const currentIdx = currentStop
    ? JOURNEY_STOPS.findIndex(s => s.id === currentStop.id)
    : -1

  const nextStop =
    currentIdx >= 0 && currentIdx < JOURNEY_STOPS.length - 1
      ? JOURNEY_STOPS[currentIdx + 1]
      : null

  async function handleShare() {
    const shareData = {
      title: 'Follow Francois & James',
      text: 'Follow Francois and James on their honeymoon — curious-traveller.netlify.app',
      url: 'https://curious-traveller.netlify.app',
    }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch (_) { /* dismissed */ }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText('https://curious-traveller.netlify.app')
      alert('Link copied to clipboard!')
    }
  }

  function getBadgeLabel(status) {
    if (status === 'past')    return 'Completed'
    if (status === 'current') return '✦ Here Now'
    return 'Coming Soon'
  }

  return (
    <div className={styles.page}>

      {/* Back button */}
      <button className={styles.back} onClick={onClose} aria-label="Back to home">
        ← Back
      </button>

      {/* Header */}
      <header className={styles.header}>
        <p className={styles.eyebrow}>Live Journey</p>
        <h1 className={styles.title}>
          Where are<br />Francois &amp; James?
        </h1>

        {isBeforeTrip && (
          <p className={styles.subtitle}>
            They depart in {daysUntilDeparture} day{daysUntilDeparture === 1 ? '' : 's'}.
          </p>
        )}
        {!isBeforeTrip && !isAfterTrip && currentStop && (
          <p className={styles.subtitle}>
            Day {dayNumber} of 18 · {currentStop.city}, {currentStop.country}
          </p>
        )}
        {isAfterTrip && (
          <p className={styles.subtitle}>They have returned home safely.</p>
        )}
      </header>

      {/* Vertical timeline */}
      <div className={styles.timeline}>
        {JOURNEY_STOPS.map((stop, i) => {
          const status  = getStopStatus(stop, today)
          const isFirst = i === 0
          const isLast  = i === JOURNEY_STOPS.length - 1
          const lineUpGold   = status === 'past' || status === 'current'
          const lineDownGold = status === 'past'

          return (
            <div key={stop.id} className={`${styles.stop} ${status === 'current' ? styles.stopCurrent : ''}`}>

              {/* Left column: vertical line + dot */}
              <div className={styles.dotCol}>
                {!isFirst && (
                  <div className={`${styles.lineUp} ${lineUpGold ? styles.lineGold : styles.lineDim}`} />
                )}
                <div className={`${styles.dot} ${styles['dot_' + status]}`}>
                  {status === 'current' && <span className={styles.pulseRing} />}
                </div>
                {!isLast && (
                  <div className={`${styles.lineDown} ${lineDownGold ? styles.lineGold : styles.lineDim}`} />
                )}
              </div>

              {/* Right column: stop content */}
              <div className={`${styles.content} ${status === 'current' ? styles.contentCurrent : ''}`}>

                <div className={styles.stopTop}>
                  <span className={styles.flag}>{stop.flag}</span>
                  <div className={styles.stopTitleGroup}>
                    <h2 className={styles.stopCity}>
                      {stop.id === 'home' ? 'Home' : stop.city}
                    </h2>
                    <p className={styles.stopCountry}>{stop.country}</p>
                  </div>
                  <span className={`${styles.badge} ${styles['badge_' + status]}`}>
                    {getBadgeLabel(status)}
                  </span>
                </div>

                <p className={styles.stopDates}>{stop.dates}</p>
                {stop.hotel && <p className={styles.stopHotel}>{stop.hotel}</p>}
                {stop.note && (
                  <p className={styles.stopNote}>{stop.note}</p>
                )}

              </div>
            </div>
          )
        })}
      </div>

      {/* Trip stats — only shown once underway */}
      {!isBeforeTrip && (
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{daysTravelled}</span>
            <span className={styles.statLabel}>Days travelled</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>18</span>
            <span className={styles.statLabel}>Total days</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>{daysRemaining}</span>
            <span className={styles.statLabel}>
              {isAfterTrip ? 'Days home' : 'Days remaining'}
            </span>
          </div>
        </div>
      )}

      {/* Next destination — only shown mid-trip with a next stop to go to */}
      {!isBeforeTrip && !isAfterTrip && nextStop && (
        <div className={styles.nextUp}>
          <p className={styles.nextLabel}>Next destination</p>
          <p className={styles.nextCity}>
            {nextStop.flag} {nextStop.id === 'home' ? 'Home — Johannesburg' : nextStop.city}
          </p>
          <p className={styles.nextDates}>{nextStop.dates}</p>
          {nextStop.hotel && (
            <p className={styles.nextHotel}>{nextStop.hotel}</p>
          )}
        </div>
      )}

      {/* After trip message */}
      {isAfterTrip && (
        <div className={styles.returnedMsg}>
          <p>Francois and James have returned home.</p>
          <p>What an extraordinary journey.</p>
        </div>
      )}

      {/* Share button */}
      <div className={styles.shareWrap}>
        <button className={styles.shareBtn} onClick={handleShare}>
          ↑ Share this journey
        </button>
      </div>

      {/* Footer line */}
      <p className={styles.footer}>
        Follow their journey at curious-traveller.netlify.app
      </p>

    </div>
  )
}
