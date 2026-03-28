// LetterPrompt — shown on 15 April after 6pm in the Seoul chapter.
// Replaces the normal Memory Jar prompt with an invitation to generate The Letter.
// Gathers all saved memories, calls the Anthropic API, saves the result, and navigates.
import { useState, useEffect } from 'react'
import { writeLetter } from '../lib/anthropic'
import { todayISO } from '../utils/dates'
import styles from './LetterPrompt.module.css'

// Pulsing compass rose SVG used as the loading indicator
function CompassRose({ className }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line x1="16" y1="2"  x2="16" y2="30" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="2"  y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="5"  y1="5"  x2="27" y2="27" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />
      <line x1="27" y1="5"  x2="5"  y2="27" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.35" />
      <polygon points="16,2 14,14 16,12 18,14" fill="currentColor" fillOpacity="0.9" />
      <polygon points="16,30 14,18 16,20 18,18" fill="currentColor" fillOpacity="0.5" />
      <circle cx="16" cy="16" r="2" fill="currentColor" fillOpacity="0.7" />
    </svg>
  )
}

export default function LetterPrompt() {
  const today = todayISO()
  const hour  = new Date().getHours()

  // Only visible on 15 April after 6pm
  if (today !== '2026-04-15' || hour < 18) return null

  // Check if the letter already exists
  const [letterExists, setLetterExists] = useState(() => {
    try { return !!localStorage.getItem('ct_letter') } catch { return false }
  })
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(false)

  const handleWrite = async () => {
    setLoading(true)
    setError(false)
    try {
      // Gather all saved memories
      let memories = []
      try {
        const raw = localStorage.getItem('ct_memories')
        if (raw) memories = JSON.parse(raw)
      } catch { /* empty */ }

      const letter = await writeLetter(memories)

      // Save to localStorage permanently
      try {
        localStorage.setItem('ct_letter', JSON.stringify(letter))
      } catch { /* storage full — still navigate */ }

      setLetterExists(true)
      // Navigate to the letter screen
      window.scrollTo(0, 0)
      window.location.hash = 'letter'
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleRead = () => {
    window.scrollTo(0, 0)
    window.location.hash = 'letter'
  }

  if (loading) {
    return (
      <div className={styles.fullScreen}>
        <CompassRose className={styles.spinner} />
        <p className={styles.loadingText}>Your companion is writing…</p>
      </div>
    )
  }

  if (letterExists) {
    return (
      <div className={styles.wrap}>
        <span className={styles.icon} aria-hidden="true">✦</span>
        <p className={styles.question}>Your letter is waiting.</p>
        <button className={styles.btn} onClick={handleRead}>
          Read our letter
        </button>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.icon} aria-hidden="true">✦</span>
      <p className={styles.question}>
        Seventeen days. Every city. Every moment you chose to keep.
        <br />
        Shall we write you a letter?
      </p>
      {error && (
        <p className={styles.errorNote}>
          The letter could not be written right now.
          Try again when you have a good connection.
          Your memories are all safe.
        </p>
      )}
      <button className={styles.btn} onClick={handleWrite}>
        Write our letter
      </button>
    </div>
  )
}
