// Memory Prompt — appears after 6pm at the bottom of the current destination chapter.
// One question. A text area. A gold checkmark saves it to the Memory Jar.
import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import styles from './MemoryPrompt.module.css'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function MemoryPrompt({ trip }) {
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)
  const [memories, setMemories] = useLocalStorage('ct_memories', [])

  const today = todayISO()
  const hour = new Date().getHours()

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

  if (saved) {
    return (
      <div className={styles.wrap}>
        <p className={styles.question}>Kept.</p>
      </div>
    )
  }

  const handleSave = () => {
    if (!text.trim()) return
    const memory = {
      id: Date.now(),
      date: today,
      city: trip.city,
      text: text.trim(),
    }
    setMemories(prev => [...prev, memory])
    setSaved(true)
    setText('')
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
