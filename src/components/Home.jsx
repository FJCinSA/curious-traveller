// Home screen — clean, spacious, like opening a beautiful book.
// One floating gold compass (serendipity) bottom right.
// One discreet hamburger menu top right — everything else lives inside.
import { useState, useEffect, useRef } from 'react'
import { skylineMap } from './Skylines'
import Greeting from './Greeting'
import DawnNote from './DawnNote'
import JourneyMap from './JourneyMap'
import CherryBlossoms from './CherryBlossoms'
import JinhaeWarning from './JinhaeWarning'
import NavDrawer from './NavDrawer'
import SerendipityButton from './SerendipityButton'
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
  if (today === TRIP_START) return { label: 'Today you begin.', pct: null }
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

function getLetterAnticipation(today) {
  if (today >= '2026-04-16') return 'Your letter is waiting.'
  if (today === '2026-04-15') return 'Tonight your companion writes your letter.'
  if (today === '2026-04-14') return 'Tomorrow your companion writes your letter.'
  if (today === '2026-04-13') return 'In two days, your companion writes your letter.'
  return null
}

export default function Home({ trips, onSelect, onOpenChecklist, onOpenMemoryJar, onOpenJourney }) {
  const today        = todayISO()
  const progress     = getTripProgress(today)
  const honeymoonDay = getHoneymoonDay(today)
  const whisper      = dailyWhispers[today] || null
  const letterHint   = getLetterAnticipation(today)
  const isCherryDay  = today === '2026-04-03'

  // Drawer
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Feature 3 — one pulse on the menu button + "Kept forever." whisper
  const [memories]                  = useLocalStorage('ct_memories', [])
  const prevMemoryCountRef          = useRef(memories.length)
  const [keptMsg,   setKeptMsg]     = useState(false)
  const [memGlow,   setMemGlow]     = useState(false)

  // Whisper fade-in
  const [whisperVisible, setWhisperVisible] = useState(false)
  useEffect(() => {
    if (whisper) {
      const t = setTimeout(() => setWhisperVisible(true), 80)
      return () => clearTimeout(t)
    }
  }, [whisper])

  // Feature 3 — one gentle pulse on the hamburger + "Kept forever." toast
  useEffect(() => {
    if (memories.length > prevMemoryCountRef.current) {
      setKeptMsg(true)
      setMemGlow(true)
      const t1 = setTimeout(() => setKeptMsg(false), 3000)
      const t2 = setTimeout(() => setMemGlow(false), 1400)
      prevMemoryCountRef.current = memories.length
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
    prevMemoryCountRef.current = memories.length
  }, [memories.length])

  const currentTrip = trips.find(t => getTripStatus(t, today) === 'current') || trips[0]
  const serendipity = currentTrip?.serendipity || []

  return (
    <div className={styles.home}>

      {/* Feature 1 — cherry blossoms on 3 April */}
      {isCherryDay && <CherryBlossoms />}

      {/* Jinhae amber warning — once at 18:00 on 2 April */}
      <JinhaeWarning />

      {/* Feature 3 — "Kept forever." toast */}
      {keptMsg && (
        <p className={styles.keptMsg} aria-live="polite">Kept forever.</p>
      )}

      {/* Hamburger — the only persistent UI chrome */}
      <button
        className={`${styles.menuBtn} ${memGlow ? styles.memGlow : ''}`}
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
        aria-expanded={drawerOpen}
      >
        <span className={styles.menuLine} />
        <span className={styles.menuLine} />
        <span className={styles.menuLine} />
      </button>

      {/* Slide-in drawer */}
      <NavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenChecklist={onOpenChecklist}
        onOpenJourney={onOpenJourney}
        onOpenMemoryJar={onOpenMemoryJar}
        memoriesCount={memories.length}
      />

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
        <p className={styles.mantra}>🌸 The world is large and you are in it. 🌸</p>
      </header>

      <DawnNote />
      <Greeting />

      {/* Progress bar */}
      {progress && (
        <div className={styles.progressWrap}>
          <div className={styles.progressLabel}>{progress.label}</div>
          {honeymoonDay === 17 && (
            <p className={styles.almostHome}>Almost home.</p>
          )}
          {progress.pct !== null && (
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress.pct}%` }}
              />
            </div>
          )}
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

            return (
              <button
                key={trip.id}
                className={[
                  styles.card,
                  trip.wide            ? styles.wide    : '',
                  status === 'past'    ? styles.past    : '',
                  status === 'current' ? styles.current : '',
                ].filter(Boolean).join(' ')}
                onClick={() => onSelect(trip.id)}
                aria-label={`Open ${trip.city} chapter`}
              >
                {SkylineSVG && (
                  <div className={styles.cardSkyline}><SkylineSVG /></div>
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
        <p className={styles.footerMantra}>🌸 The world is large and you are in it. 🌸</p>
        <p>The Curious Traveller · 2026</p>
        <p className={styles.footerCredit}>Built with care. 27 March 2026.</p>
      </footer>

      <SerendipityButton serendipity={serendipity} theme={currentTrip?.theme || ''} />

    </div>
  )
}
