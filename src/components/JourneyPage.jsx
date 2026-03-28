// JourneyPage — full-page journey tracker for family and friends.
// Shows the complete honeymoon route as a warm vertical timeline.
// Accessible at #journey via the Journey button on the home screen.
// Features:
//   • Traveller View: vertical timeline with breathing pulse dot + ripple + live counter
//   • Family View: big city name, pulsing dot, distance, city fact, latest memory
//   • Share Card: beautiful CSS modal with native share / clipboard fallback
import { useState } from 'react'
import {
  JOURNEY_STOPS, TRIP_START, TRIP_END,
  getStopStatus, getCurrentStop, getHoneymoonDay,
  getDaysTravelled, getDaysRemaining,
  DISTANCES_FROM_HOME, CITY_FACTS,
} from '../data/journey'
import { todayISO } from '../utils/dates'
import { useLocalStorage } from '../hooks/useLocalStorage'
import styles from './JourneyPage.module.css'

export default function JourneyPage({ onClose }) {
  const today          = todayISO()
  const isBeforeTrip   = today < TRIP_START
  const isAfterTrip    = today > TRIP_END
  const isOnTrip       = !isBeforeTrip && !isAfterTrip
  const currentStop    = getCurrentStop(today)
  const dayNumber      = getHoneymoonDay(today)
  const daysTravelled  = getDaysTravelled(today)
  const daysRemaining  = getDaysRemaining(today)
  const [familyView,  setFamilyView]  = useState(false)
  const [shareOpen,   setShareOpen]   = useState(false)
  const [copied,      setCopied]      = useState(false)
  const [memories]                    = useLocalStorage('ct_memories', [])

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

  const distanceFromHome = currentStop ? (DISTANCES_FROM_HOME[currentStop.id] || 0) : 0
  const latestMemory     = memories.length > 0 ? memories[memories.length - 1] : null

  async function handleNativeShare() {
    const url = 'https://curious-traveller.netlify.app'
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Follow Francois & James',
          text: 'Follow Francois and James on their honeymoon.',
          url,
        })
      } catch (_) { /* user dismissed */ }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
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

      {/* View toggle */}
      <div className={styles.viewToggle}>
        <button
          className={`${styles.viewBtn} ${!familyView ? styles.viewBtnActive : ''}`}
          onClick={() => setFamilyView(false)}
        >
          Traveller
        </button>
        <button
          className={`${styles.viewBtn} ${familyView ? styles.viewBtnActive : ''}`}
          onClick={() => setFamilyView(true)}
        >
          Family View
        </button>
      </div>

      {/* ─── FAMILY VIEW ─── */}
      {familyView ? (
        <div className={styles.familyWrap}>
          <p className={styles.familyEyebrow}>Right now</p>

          {isBeforeTrip && (
            <>
              <p className={styles.familyFlag}>✈️</p>
              <h2 className={styles.familyCity}>Johannesburg</h2>
              <p className={styles.familyFact}>
                They depart in {daysUntilDeparture} day{daysUntilDeparture === 1 ? '' : 's'}.
              </p>
            </>
          )}

          {isAfterTrip && (
            <>
              <p className={styles.familyFlag}>🏠</p>
              <h2 className={styles.familyCity}>Home</h2>
              <p className={styles.familyFact}>Francois and James are home.</p>
              <p className={styles.familyLove}>What an extraordinary journey.</p>
            </>
          )}

          {isOnTrip && currentStop && (
            <>
              <p className={styles.familyFlag}>{currentStop.flag}</p>
              <h2 className={styles.familyCity}>{currentStop.city}</h2>
              <div className={styles.familyDotWrap} aria-hidden="true">
                <span className={styles.familyDot} />
                <span className={styles.familyRipple} />
              </div>
              <p className={styles.familyDistance}>
                {distanceFromHome.toLocaleString()} km from home &nbsp;·&nbsp; Day {dayNumber} of 18
              </p>
              <p className={styles.familyFact}>{CITY_FACTS[currentStop.id] || ''}</p>
              {latestMemory && (
                <div className={styles.familyMemory}>
                  <span className={styles.familyMemoryIcon} aria-hidden="true">✦</span>
                  <p className={styles.familyMemoryText}>
                    "{latestMemory.poeticText || latestMemory.text}"
                  </p>
                </div>
              )}
              <p className={styles.familyLove}>They are having the time of their lives.</p>
            </>
          )}

          <button className={styles.shareBtn} onClick={() => setShareOpen(true)} style={{ marginTop: '2rem' }}>
            ↑ Share this journey
          </button>
        </div>

      ) : (
        <>
          {/* ─── TRAVELLER VIEW ─── */}

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
            {isOnTrip && currentStop && (
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
              const status       = getStopStatus(stop, today)
              const isFirst      = i === 0
              const isLast       = i === JOURNEY_STOPS.length - 1
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
                      {status === 'current' && (
                        <>
                          <span className={styles.pulseRing} aria-hidden="true" />
                          <span className={styles.rippleRing} aria-hidden="true" />
                        </>
                      )}
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
                    {stop.note  && <p className={styles.stopNote}>{stop.note}</p>}

                    {/* Feature 4 — live counter below current stop */}
                    {status === 'current' && isOnTrip && (
                      <p className={styles.liveCounter}>
                        {distanceFromHome.toLocaleString()} km from home &nbsp;·&nbsp; Day {dayNumber} of 18
                      </p>
                    )}

                  </div>
                </div>
              )
            })}
          </div>

          {/* Trip stats */}
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

          {/* Next destination */}
          {isOnTrip && nextStop && (
            <div className={styles.nextUp}>
              <p className={styles.nextLabel}>Next destination</p>
              <p className={styles.nextCity}>
                {nextStop.flag} {nextStop.id === 'home' ? 'Home — Johannesburg' : nextStop.city}
              </p>
              <p className={styles.nextDates}>{nextStop.dates}</p>
              {nextStop.hotel && <p className={styles.nextHotel}>{nextStop.hotel}</p>}
            </div>
          )}

          {isAfterTrip && (
            <div className={styles.returnedMsg}>
              <p>Francois and James have returned home.</p>
              <p>What an extraordinary journey.</p>
            </div>
          )}

          <div className={styles.shareWrap}>
            <button className={styles.shareBtn} onClick={() => setShareOpen(true)}>
              ↑ Share this journey
            </button>
          </div>

          <p className={styles.footer}>
            Follow their journey at curious-traveller.netlify.app
          </p>
        </>
      )}

      {/* ─── SHARE CARD MODAL (Feature 9) ─── */}
      {shareOpen && (
        <div className={styles.shareOverlay} onClick={() => setShareOpen(false)}>
          <div className={styles.shareCard} onClick={e => e.stopPropagation()}>

            <p className={styles.shareCardEyebrow}>The Curious Traveller</p>

            {isOnTrip && currentStop ? (
              <>
                <p className={styles.shareCardFlag}>{currentStop.flag}</p>
                <h2 className={styles.shareCardCity}>{currentStop.city}</h2>
                <p className={styles.shareCardDay}>Day {dayNumber} of 18</p>
                <p className={styles.shareCardDist}>{distanceFromHome.toLocaleString()} km from home</p>
              </>
            ) : isBeforeTrip ? (
              <>
                <p className={styles.shareCardFlag}>✈️</p>
                <h2 className={styles.shareCardCity}>Departing soon</h2>
                <p className={styles.shareCardDay}>In {daysUntilDeparture} days</p>
              </>
            ) : (
              <>
                <p className={styles.shareCardFlag}>🏠</p>
                <h2 className={styles.shareCardCity}>Journey complete</h2>
                <p className={styles.shareCardDay}>18 extraordinary days</p>
              </>
            )}

            {/* Mini route dots */}
            <div className={styles.shareCardDots}>
              {JOURNEY_STOPS.map(stop => {
                const s = getStopStatus(stop, today)
                return (
                  <div key={stop.id} className={styles.shareCardDotWrap}>
                    <span className={`${styles.shareCardDot} ${styles['shareCardDot_' + s]}`} />
                    <span className={styles.shareCardDotLabel}>{stop.label}</span>
                  </div>
                )
              })}
            </div>

            <p className={styles.shareCardUrl}>curious-traveller.netlify.app</p>

            <div className={styles.shareCardFooter}>
              <button className={styles.shareCardBtn} onClick={handleNativeShare}>
                {copied ? '✓ Copied!' : '↑ Share'}
              </button>
              <button className={styles.shareCardClose} onClick={() => setShareOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
