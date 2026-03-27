// Dawn Protocol — a single beautiful sentence shown before 11am on the home screen.
// Knows the exact date. Surfaces one perfect thing for that day.
// Fades in gently on load. Disappears after 11am.
import { useState, useEffect } from 'react'
import { dawnNotes } from '../data/itinerary'
import { todayISO } from '../utils/dates'
import styles from './DawnNote.module.css'

export default function DawnNote() {
  const [visible, setVisible] = useState(false)
  const [past11, setPast11] = useState(() => new Date().getHours() >= 11)

  // Gentle fade-in after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Schedule the fade-out exactly at 11:00am if we're currently before it
  useEffect(() => {
    if (past11) return
    const now = new Date()
    const elevenAM = new Date()
    elevenAM.setHours(11, 0, 0, 0)
    if (now < elevenAM) {
      const ms = elevenAM - now
      const t = setTimeout(() => setPast11(true), ms)
      return () => clearTimeout(t)
    }
  }, [past11])

  const today = todayISO()
  const note = dawnNotes[today]

  // No note for this date, or already past 11am
  if (!note || past11) return null

  return (
    <div className={`${styles.wrap} ${visible ? styles.visible : ''}`}>
      <span className={styles.icon} aria-hidden="true">✦</span>
      <p className={styles.text}>{note}</p>
    </div>
  )
}
