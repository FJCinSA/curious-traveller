import { useEffect, useState } from 'react'
import styles from './InstallPrompt.module.css'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    // Check if already running as installed PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true)
      return
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => {
      setVisible(false)
      setInstalled(true)
      setDeferredPrompt(null)
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setVisible(false)
    setDeferredPrompt(null)
  }

  if (installed || !visible) return null

  return (
    <div className={styles.banner} role="complementary" aria-label="Install app">
      <div className={styles.icon}>✦</div>
      <div className={styles.text}>
        <strong>Install The Curious Traveller</strong>
        <span>Works offline · Feels native · No app store</span>
      </div>
      <div className={styles.actions}>
        <button onClick={() => setVisible(false)} className={styles.dismiss} aria-label="Dismiss">
          Later
        </button>
        <button onClick={handleInstall} className={styles.install}>
          Install
        </button>
      </div>
    </div>
  )
}
