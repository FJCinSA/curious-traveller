// Memory Prompt — appears after 6pm at the bottom of the current destination chapter.
// One question. A text area. A gold checkmark saves it to the Memory Jar.
// After saving the raw text, the companion shapes it into a poetic version via the API.
// Raw memory is always saved first — the API call never blocks preservation.
import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { shapeMemory } from '../lib/anthropic'
import styles from './MemoryPrompt.module.css'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function MemoryPrompt({ trip }) {
  const [text, setText]       = useState('')
  const [saved, setSaved]     = useState(false)
  const [shaping, setShaping] = useState(false)
  const [memories, setMemories] = useLocalStorage('ct_memories', [])

  const today = todayISO()
  const hour  = new Date().getHours()

  // Only show during this trip and after 6pm
  if (!trip.startDate || !trip.endDate) return null
  if (today < trip.startDate || today > trip.endDate) return null
  if (hour < 18) return null

  // Already saved a memory for today
  const alreadySaved = memories.some(m => m.date === today)
  if (alreadySaved && !saved) {
    return (
      <div className={styles.wrap}>
        <p className={styles.question}>Today's memory has been kept.</p>
      </div>
    )
  }

  if (shaping) {
    return (
      <div className={styles.wrap}>
        <span className={styles.icon} aria-hidden="true">✦</span>
        <p className={styles.question}>Your companion is shaping this memory…</p>
      </div>
    )
  }

  if (saved) {
    return (
      <div className={styles.wrap}>
        <p className={styles.question}>Kept.</p>
      </div>
    )
  }

  const handleSave = async () => {
    if (!text.trim()) return
    const rawText = text.trim()
    const id = Date.now()

    // Save raw immediately — nothing is ever lost
    const memory = { id, date: today, city: trip.city, text: rawText, poeticText: null }
    setMemories(prev => [...prev, memory])
    setSaved(true)
    setText('')

    // Try to shape it — silently ignore any failure
    setShaping(true)
    try {
      const poetic = await shapeMemory(rawText, today, trip.city)
      setMemories(prev =>
        prev.map(m => m.id === id ? { ...m, poeticText: poetic } : m)
      )
    } catch {
      // API unavailable or key not set — raw memory is safe, no error shown
    } finally {
      setShaping(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSave()
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.icon} aria-hidden="true">✦</span>
      <p className={styles.question}>
        What was the one moment today you want to keep?
      </p>
      <div className={styles.inputRow}>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Write it here…"
          rows={3}
          aria-label="Memory for today"
        />
        <button
          className={styles.save}
          onClick={handleSave}
          disabled={!text.trim()}
          aria-label="Save memory"
        >
          ✓
        </button>
      </div>
    </div>
  )
}
