// Home screen — header, personalised greeting, trip progress bar, and destination card grid.
// Each card is a button that navigates to that trip's chapter via onSelect.
// Cards reflect the trip's status: past (dimmed), current (gold glow + pulsing dot), future (normal).
// Bells & whistles:
//   Feature 1 — Cherry Blossom Explosion on 3 April
//   Feature 2 — Arrival day gold ring burst on the current card
//   Feature 3 — Memory Jar Glow when a new memory is saved
//   Feature 6 — Slow travel tortoise walks across the screen on toggle-on
//   Feature 7 — Progress bar milestones on Day 5, 10, 17
//   Feature 8 — Letter anticipation countdown from Day 15
import { useState, useEffect, useRef } from 'react'
import { skylineMap } from './Skylines'
import Greeting from './Greeting'
import DawnNote from './DawnNote'
import JourneyMap from './JourneyMap'
import CherryBlossoms from './CherryBlossoms'
import SerendipityButton from './SerendipityButton'
import { useSlowTravel } from '../context/SlowTravelContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { TRIP_START, TRIP_END, dailyWhispers } from '../data/itinerary'
import { getHoneymoonDay } from '../data/journey'
import { todayISO } from '../utils/dates'
import styles from './Home.module.css'

function getTripProgress(today) {
  if (today < TRIP_START) {
    const daysLeft = Math.round(
      (new Date(TRIP_START + 'T00:00:00Z') - new Date(today + 'T00:00:00Z')) / 86_400_000
    )
    return {
      label: `Your adventure begins in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`,
      pct: null,
    }
  }
  if (today > TRIP_END) return null
  if (today === TRIP_START) {
    return { label: 'Today you begin.', pct: null }
  }
  const currentDay = Math.round(
    (new Date(today + 'T00:00:00Z') - new Date(TRIP_START + 'T00:00:00Z')) / 86_400_000
  ) + 1
  return { label: `Day ${currentDay} of 18`, pct: (currentDay / 18) * 100 }
}

function getTripStatus(trip, today) {
  if (!trip.startDate || !trip.endDate) return 'future'
  if (today > trip.endDate)    return 'past'
  if (today >= trip.startDate) return 'current'
  return 'future'
}

// Feature 8: letter anticipation text based on date
function getLetterAnticipation(today) {
  if (today >= '2026-04-16') return 'Your letter is waiting. 💌'
  if (today === '2026-04-15') return 'Tonight your companion writes your letter.'
  if (today === '2026-04-14') return '1 day until your letter is written.'
  if (today === '2026-04-13') return '2 days until your letter is written.'
  return null
}

export default function Home({ trips, onSelect, onOpenChecklist, onOpenMemoryJar, onOpenJourney }) {
  const today         = todayISO()
  const progress      = getTripProgress(today)
  const honeymoonDay  = getHoneymoonDay(today)
  const { slowTravel, setSlowTravel } = useSlowTravel()
  const whisper       = dailyWhispers[today] || null
  const letterHint    = getLetterAnticipation(today)
  const isCherryDay   = today === '2026-04-03'

  // Feature 3 — memory jar glow
  const [memories]                       = useLocalStorage('ct_memories', [])
  const prevMemoryCountRef               = useRef(memories.length)
  const [memGlow,    setMemGlow]         = useState(false)
  const [keptMsg,    setKeptMsg]         = useState(false)

  // Feature 6 — slow travel tortoise
  const prevSlowTravelRef                = useRef(slowTravel)
  const [showTortoise, setShowTortoise]  = useState(false)

  // Whisper fade-in
  const [whisperVisible, setWhisperVisible] = useState(false)
  useEffect(() => {
    if (whisper) {
      const t = setTimeout(() => setWhisperVisible(true), 80)
      return () => clearTimeout(t)
    }
  }, [whisper])

  // Feature 3 — detect new memory saved
  useEffect(() => {
    if (memories.length > prevMemoryCountRef.current) {
      setMemGlow(true)
      setKeptMsg(true)
      const t1 = setTimeout(() => setMemGlow(false), 2000)
      const t2 = setTimeout(() => setKeptMsg(false), 3000)
      prevMemoryCountRef.current = memories.length
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
    prevMemoryCountRef.current = memories.length
  }, [memories.length])

  // Feature 6 — tortoise on slow travel toggle-on
  useEffect(() => {
    if (slowTravel && !prevSlowTravelRef.current) {
      setShowTortoise(true)
      const t = setTimeout(() => setShowTortoise(false), 3200)
      prevSlowTravelRef.current = slowTravel
      return () => clearTimeout(t)
    }
    prevSlowTravelRef.current = slowTravel
  }, [slowTravel])

  // Serendipity: use the current destination's serendipity, fall back to first trip
  const currentTrip = trips.find(t => getTripStatus(t, today) === 'current') || trips[0]
  const serendipity = currentTrip?.serendipity || []

  return (
    <div className={styles.home}>

      {/* Feature 1 — cherry blossoms fall on 3 April */}
      {isCherryDay && <CherryBlossoms />}

      {/* Feature 6 — tortoise walks on slow travel toggle */}
      {showTortoise && (
        <span className={styles.tortoise} aria-hidden="true">🐢</span>
      )}

      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.topLeft}>
          <button
            className={styles.topBtn}
            onClick={onOpenChecklist}
            aria-label="Open pre-departure checklist"
            title="Before you leave"
          >
            ✓ Before you leave
          </button>
          <button
            className={styles.topBtn}
            onClick={onOpenJourney}
            aria-label="Open journey tracker"
            title="Journey"
          >
            ◎ Journey
          </button>
        </div>
        <div className={styles.topRight}>
          <button
            className={`${styles.topBtn} ${styles.slowToggle} ${slowTravel ? styles.slowOn : ''}`}
            onClick={() => setSlowTravel(v => !v)}
            aria-label={slowTravel ? 'Slow travel mode on' : 'Slow travel mode off'}
            title="Slow Travel Mode"
          >
            🐢
          </button>
          <button
            className={`${styles.topBtn} ${memGlow ? styles.memGlow : ''}`}
            onClick={onOpenMemoryJar}
            aria-label="Open memory jar"
            title="Memory Jar"
          >
            ◇ Memories{memories.length > 0 && (
              <span className={styles.memBadge}>{memories.length}</span>
            )}
          </button>
        </div>
      </div>

      {/* Feature 3 — "Kept forever." whisper */}
      {keptMsg && (
        <p className={styles.keptMsg} aria-live="polite">Kept forever.</p>
      )}

      <header className={styles.header}>
        <p className={styles.eyebrow}>For Francois &amp; James</p>
        <h1 className={styles.title}>The Curious<br />Traveller</h1>
        <p className={styles.subtitle}>March – April 2026</p>
        {whisper && (
          <p className={`${styles.whisper} ${whisperVisible ? styles.whisperVisible : ''}`}>
            {whisper}
          </p>
        )}
        <p className={styles.companionLine}>A wise and patient companion for the curious.</p>
      </header>

      <DawnNote />
      <Greeting />

      {/* Progress bar */}
      {progress && (
        <div className={`${styles.progressWrap} ${honeymoonDay === 17 ? styles.milestoneAlmostHome : ''}`}>
          <div className={styles.progressLabel}>{progress.label}</div>
          {honeymoonDay === 17 && (
            <p className={styles.almostHome}>Almost home.</p>
          )}
          {progress.pct !== null && (
            <div className={styles.progressTrack}>
              <div
                className={[
                  styles.progressFill,
                  honeymoonDay === 5  ? styles.milestone5  : '',
                  honeymoonDay === 10 ? styles.milestone10 : '',
                  honeymoonDay === 17 ? styles.milestone17 : '',
                ].filter(Boolean).join(' ')}
                style={{ width: `${progress.pct}%` }}
              />
            </div>
          )}
          {/* Feature 8 — letter anticipation */}
          {letterHint && (
            <p className={styles.letterHint}>{letterHint}</p>
          )}
        </div>
      )}

      <main className={styles.main}>
        <div className={styles.grid}>
          {trips.map(trip => {
            const SkylineSVG  = skylineMap[trip.theme]
            const status      = getTripStatus(trip, today)
            const totalStops  = trip.days.reduce((n, d) => n + d.locations.length, 0)
            // Feature 2 — arrival day burst (CSS animation fires once on arrival day)
            const isArrivalDay = status === 'current' && today === trip.startDate

            return (
              <button
                key={trip.id}
                className={[
                  styles.card,
                  trip.wide            ? styles.wide       : '',
                  status === 'past'    ? styles.past       : '',
                  status === 'current' ? styles.current    : '',
                  isArrivalDay         ? styles.arrivalDay : '',
                ].filter(Boolean).join(' ')}
                onClick={() => onSelect(trip.id)}
                aria-label={`Open ${trip.city} chapter`}
              >
                {SkylineSVG && (
                  <div className={styles.cardSkyline}>
                    <SkylineSVG />
                  </div>
                )}
                <div className={styles.cardOverlay} style={{ background: trip.cardGradient }} />
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <span className={styles.flag}>{trip.flag}</span>
                    <span className={styles.country}>{trip.country}</span>
                    {status === 'current' && (
                      <span className={styles.pulseDot} aria-label="You are here" />
                    )}
                  </div>
                  <h2 className={styles.cardCity}>{trip.city}</h2>
                  <p className={styles.cardDates}>{trip.dates}</p>
                  {trip.hotel && <p className={styles.cardHotel}>{trip.hotel}</p>}
                  <div className={styles.cardMeta}>
                    <span className={styles.cardStops}>{totalStops} stops</span>
                    {trip.nights > 0 && (
                      <span className={styles.cardNights}>
                        {trip.nights} {trip.nights === 1 ? 'night' : 'nights'}
                      </span>
                    )}
                    {trip.nights === 0 && (
                      <span className={styles.cardNights}>day trip</span>
                    )}
                  </div>
                </div>
                <div className={styles.cardArrow} style={{ color: trip.heroAccent }}>→</div>
              </button>
            )
          })}
        </div>
      </main>

      <JourneyMap onOpenJourney={onOpenJourney} />

      <footer className={styles.footer}>
        <p>The Curious Traveller · 2026</p>
        <p className={styles.footerCredit}>Built with care. 27 March 2026.</p>
      </footer>

      <SerendipityButton serendipity={serendipity} theme={currentTrip?.theme || ''} />

    </div>
  )
}
