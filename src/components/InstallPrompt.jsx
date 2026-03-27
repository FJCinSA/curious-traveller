// Bottom banner that prompts the user to install the app as a PWA.
// Only shown on browsers that support the Web App Install API (Chrome/Android/Edge).
// Automatically hidden if the app is already running in standalone (installed) mode.
import { useEffect, useState } from 'react'
import styles from './InstallPrompt.module.css'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible]   = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    // Already running as an installed PWA — never show the banner
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true)
      return
    }

    // The browser fires `beforeinstallprompt` before showing its own install UI.
    // We intercept it so we can show our own banner and trigger the prompt on demand.
    const handleBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setVisible(true)
    }

    // Fires after the user completes installation — dismiss the banner
    const handleInstalled = () => {
      setVisible(false)
      setInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleInstalled)

    // Clean up both listeners to prevent memory leaks
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  // Triggers the browser's native PWA install dialog
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
