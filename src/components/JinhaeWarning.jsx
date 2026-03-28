// JinhaeWarning — amber toast shown once at 18:00 on 2 April.
// Reminds them to book Kakao Taxi for tomorrow's early Jinhae trip.
// Dismissed and never shown again via localStorage ct_jinhae_warned.
import { useState } from 'react'
import { todayISO } from '../utils/dates'
import styles from './JinhaeWarning.module.css'

export default function JinhaeWarning() {
  const today = todayISO()
  const hour  = new Date().getHours()

  // Only on 2 April at or after 18:00
  if (today !== '2026-04-02' || hour < 18) return null

  const [visible, setVisible] = useState(() => {
    try { return !localStorage.getItem('ct_jinhae_warned') } catch { return true }
  })

  const handleDismiss = () => {
    try { localStorage.setItem('ct_jinhae_warned', '1') } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.wrap} role="alert">
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.icon}>🌸</span>
          <span className={styles.label}>Tomorrow — Jinhae</span>
        </div>
        <p className={styles.text}>
          The cherry blossoms will be at their peak tomorrow. It gets crowded fast —
          open Kakao T tonight and book your taxi for an early start.
        </p>
        <button className={styles.dismiss} onClick={handleDismiss}>
          Got it
        </button>
      </div>
    </div>
  )
}
